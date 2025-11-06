
const Portfolio = require('../models/portfolio.model.js');
const mongoose = require('mongoose');


const createPortfolio = async (req, res) => {
    try {
        console.log('CreatePortfolio - incoming req.body:', JSON.stringify(req.body, null, 2));
        const portfolioData = { ...req.body, userId: req.user.id };
        const newPortfolio = new Portfolio(portfolioData);
        await newPortfolio.save();
        res.status(201).json(newPortfolio);
    } catch (error) {
        console.error("Create Portfolio Error:", error);
        res.status(400).json({ message: error.message });
    }
};


const getAllPublicPortfolios = async (req, res) => {
    try {
        const portfolios = await Portfolio.find().sort({ createdAt: -1 });
        res.status(200).json(portfolios);
    } catch (error) {
        console.error("Get All Public Portfolios Error:", error);
        res.status(500).json({ message: error.message });
    }
};


const getMyPortfolios = async (req, res) => {
    try {
        const portfolios = await Portfolio.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(portfolios);
    } catch (error) {
        console.error("Get My Portfolios Error:", error);
        res.status(500).json({ message: error.message });
    }
};


const getPortfolioById = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid Portfolio ID format' });
        }
        const portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }
        res.status(200).json(portfolio);
    } catch (error) {
        console.error("Get Portfolio By ID Error:", error);
        res.status(500).json({ message: error.message });
    }
};


const updatePortfolio = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid Portfolio ID format' });
        }

        console.log("--- Update Request Received ---"); 
        console.log("Incoming Body Data (req.body):", JSON.stringify(req.body, null, 2));

        
        let portfolio = await Portfolio.findById(req.params.id);
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }

        
        if (portfolio.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized' });
        }

        
        const updateData = req.body;

        
        portfolio.basic = portfolio.basic || {};
        portfolio.hero = portfolio.hero || {};
        portfolio.about = portfolio.about || {};
        portfolio.contact = portfolio.contact || {};

        
        for (const key in updateData) {
            if (updateData.hasOwnProperty(key)) {
                if (['basic', 'hero', 'about', 'contact'].includes(key) && typeof updateData[key] === 'object' && updateData[key] !== null) {
                    
                    for (const subKey in updateData[key]) {
                        if (updateData[key].hasOwnProperty(subKey)) {
                            
                            portfolio[key][subKey] = updateData[key][subKey];
                        }
                    }
                } else if (['skills', 'services', 'projects', 'testimonials'].includes(key)) {
                    
                    portfolio[key] = updateData[key];
                } else if (key === 'templateId') {
                    
                    portfolio[key] = updateData[key];
                }
                
            }
        }
        

        console.log("Portfolio Data AFTER Dot Assignment (Before Save):", JSON.stringify(portfolio.toObject ? portfolio.toObject() : portfolio, null, 2)); 

        
        const savedPortfolio = await portfolio.save();

        console.log("--- Update Successful ---");
        res.status(200).json(savedPortfolio);

    } catch (error) {
        console.error("--- Update Portfolio Error ---:", error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join('. ') });
        }
        res.status(400).json({ message: error.message || "Update failed" });
    }
};


const deletePortfolio = async (req, res) => {
   
   try {
     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {  }
    const portfolioDoc = await Portfolio.findById(req.params.id);
    if (!portfolioDoc) return res.status(404).json({ message: 'Portfolio not found' });
     if (portfolioDoc.userId.toString() !== req.user.id) {  }
    await Portfolio.findByIdAndDelete(req.params.id);
    console.log("--- Delete Successful --- for ID:", req.params.id);
    res.status(200).json({ message: 'Portfolio deleted successfully' });
  } catch (error) {  }
};

module.exports = {
    createPortfolio,
    getAllPublicPortfolios,
    getMyPortfolios,
    getPortfolioById,
    updatePortfolio,
    deletePortfolio,
};