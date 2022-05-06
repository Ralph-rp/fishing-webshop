
import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;
// used for timestamp to date conversion
export { Timestamp };

export interface Item {
    id: string;
    name: string;
    price: number;
    // category of item
    category: string;
    description: string;
    // number of same items
    quantity: number;
    lastUpdate: Date;
    // often bought together
    relatedItems?: string[];
}