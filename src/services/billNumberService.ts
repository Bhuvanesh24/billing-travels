import { doc, runTransaction } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Gets the next sequential bill number from Firestore
 * Uses atomic transaction to ensure no duplicate numbers
 * @returns Promise<string> - Formatted bill number like "#00001"
 */
export const getNextBillNumber = async (): Promise<string> => {
    try {
        const counterRef = doc(db, 'counters', 'billNumber');

        const newBillNumber = await runTransaction(db, async (transaction) => {
            const counterDoc = await transaction.get(counterRef);

            // Get current count, default to 0 if document doesn't exist
            const currentCount = counterDoc.exists()
                ? (counterDoc.data().count || 0)
                : 0;

            // Increment count
            const nextCount = currentCount + 1;

            // Update the counter document
            transaction.set(counterRef, { count: nextCount }, { merge: true });

            return nextCount;
        });

        // Format with leading zeros (5 digits: #00001, #00002, etc.)
        const formattedNumber = `#${String(newBillNumber).padStart(5, '0')}`;

        return formattedNumber;
    } catch (error) {
        console.error('Error getting next bill number:', error);

        // Retry once in case of transient error
        try {
            console.log('Retrying bill number generation...');
            const counterRef = doc(db, 'counters', 'billNumber');

            const newBillNumber = await runTransaction(db, async (transaction) => {
                const counterDoc = await transaction.get(counterRef);
                const currentCount = counterDoc.exists() ? (counterDoc.data().count || 0) : 0;
                const nextCount = currentCount + 1;
                transaction.set(counterRef, { count: nextCount }, { merge: true });
                return nextCount;
            });

            return `#${String(newBillNumber).padStart(5, '0')}`;
        } catch (retryError) {
            console.error('Retry failed:', retryError);
            throw new Error('Failed to generate bill number. Please try again.');
        }
    }
};
