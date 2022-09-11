import { Alert } from 'react-native';
import db from './openDB';
import { firebaseDB } from '../../firebase-config.js';
import {
    ref,
    onValue,
    push,
    update,
    remove
  } from 'firebase/database';
// Table Name
const tableName = 'transactions';

// Delete Table
// export const deleteTable = () => {
//     db.transaction((tx) => {
//         tx.executeSql(
//             'DROP TABLE IF EXISTS ' + tableName,
//             [],
//             () => {
//                 console.log('deleted');
//             },
//             error => {
//                 console.log(error);
//             }
//         );
//     });
// }

// Create Transactions Table
export const createTransactionsTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS ' + tableName +
            ' (id INTEGER PRIMARY KEY AUTOINCREMENT, category VARCHAR(50) NOT NULL, icon VARCHAR(30) NOT NULL, transaction_date TEXT NOT NULL, amount FLOAT NOT NULL, type VARCHAR(20) NOT NULL);',
            [],
            () => {
                console.log('created');
            },
            error => {
                console.log(error);
            }
        );
    });
}

// Get Transactions
export const getTransactions = (setTransactions) => {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM ' + tableName,
            [],
            (tx, results) => {
                var len = results.rows.length;
                let result = [];

                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        result.push({
                            id: row.id,
                            category: row.category,
                            icon: row.icon,
                            transaction_date: row.transaction_date,
                            amount: row.amount,
                            type: row.type
                        })
                    }
                }
                else {
                    console.log('empty');
                }
                setTransactions(result);
            },
            error => {
                console.log(error);
            }
        );
    });
}

// Get Incomes
export const getIncomes = (setIncomes) => {
    return onValue(ref(firebaseDB, '/income'), querySnapShot => {
        let data = querySnapShot.val() || {};
        let transactions = {...data};
        const keys = Object.keys(transactions);
        console.log(transactions);
        var len = keys.length;
        let result = [];
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                let key = keys[i];
                let data = transactions[key];
                result.push({
                    id: key,
                    category: data['category'],
                    icon: data['icon'],
                    transaction_date: data['date'],
                    amount: data['amount'],
                    type: 'income'
                })
            }
        }
        setIncomes(result);
      });
}

// Get Expenses
export const getExpenses = (setExpenses) => {
    return onValue(ref(firebaseDB, '/expense'), querySnapShot => {
        let data = querySnapShot.val() || {};
        let transactions = {...data};
        const keys = Object.keys(transactions);
        console.log(transactions);
        var len = keys.length;
        let result = [];
        if (len > 0) {
            for (let i = 0; i < len; i++) {
                let key = keys[i];
                let data = transactions[key];
                result.push({
                    id: key,
                    category: data['category'],
                    icon: data['icon'],
                    transaction_date: data['date'],
                    amount: data['amount'],
                    type: 'expense'
                })
            }
        }
        setExpenses(result);
      });
}

// GetTotal Incomes
export const getTotalIncomes = (setTotalIncomes) => {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM ' + tableName + ' WHERE type = ?',
            ['income'],
            (tx, results) => {
                var len = results.rows.length;
                let total = 0;

                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        total += row.amount;
                    }
                }
                else {
                    console.log('empty');
                }
                setTotalIncomes(total)
            },
            error => {
                console.log(error);
            }
        );
    });
}

// GetTotal Expenses
export const getTotalExpenses = (setTotalExpenses) => {
    db.transaction((tx) => {
        tx.executeSql(
            'SELECT * FROM ' + tableName + ' WHERE type = ?',
            ['expense'],
            (tx, results) => {
                var len = results.rows.length;
                let total = 0;

                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i);
                        total += row.amount;
                    }
                }
                else {
                    console.log('empty');
                }
                setTotalExpenses(total)
            },
            error => {
                console.log(error);
            }
        );
    });
}

// Insert Transactions
export const insertTransaction = (item) => {
    if (!item.amount || item.amount == 0) {
        Alert.alert('Oups !', 'Please, write correct data.')
    }
    else {
        push(ref(firebaseDB, '/'+item.type), {
            category: item.category,
            icon: item.icon,
            date: item.date,
            amount: item.amount,
        });
    }
}

// Update Transactions
export const updateTransaction = (item) => {
    if (!item.amount || item.amount == 0) {
        Alert.alert('Oups !', 'Please, write correct data.')
    }
    else {
        update(ref(firebaseDB, `${item.type}/`), {
            [item.id]: {
              category: item.category,
              icon: item.icon,
              date: item.date,
              amount: item.amount,
            },
          });
    }
}

// Delete Transaction
export const deleteTransaction = (item) => {
    remove(ref(firebaseDB, `${item.type}/${item.id}`));
}

// Drop Table
export const deleteTransactionsTable = () => {
    db.transaction((tx) => {
        tx.executeSql(
            `drop table ${tableName}`,
            [],
            () => {
                console.log('deleted');
            },
            error => {
                console.log(error);
            }
        );
    });
}