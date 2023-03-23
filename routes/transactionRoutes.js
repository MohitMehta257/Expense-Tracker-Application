const express=require('express');
const { addTransaction, getAllTransaction } = require('../controllers/transactionctrl');

//router object

const router =express.Router();

//routers
//add transaction

router.post('/add-transaction',addTransaction);

//get transaction
router.post('/get-transaction',getAllTransaction);



module.exports=router;

