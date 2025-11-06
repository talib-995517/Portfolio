
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');

const {
  createPortfolio,
  getAllPublicPortfolios, 
  getMyPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
} = require('../controllers/portfolio.controller');



router.route('/public').get(getAllPublicPortfolios); 


router.route('/:id').get(getPortfolioById);


router.route('/')
  .post(protect, createPortfolio); 


router.route('/my/list').get(protect, getMyPortfolios); 

router.route('/:id')
  .put(protect, updatePortfolio)    
  .delete(protect, deletePortfolio); 

module.exports = router;