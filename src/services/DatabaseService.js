import firebase from './fire';

let database = firebase.app.database();

function getAll(dataUrl, orderby, handleLoaded, handleChildAdded) {
    let dataRef = database.ref(dataUrl).orderByChild(orderby);
    dataRef.on('value', snapshot => handleLoaded(snapshot));
    dataRef.on('child_added', data => handleChildAdded(data));

    return () => {
        dataRef.off('value', handleLoaded);
        dataRef.off('child_added', handleChildAdded);
    }
}

function create(dataUrl, data) {
    database.ref(dataUrl).push(data);
}

export default {
    getAll: getAll,
    create: create
}