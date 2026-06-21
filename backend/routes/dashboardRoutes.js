const express = require('express');
const router = express.Router()
const {getDashboardSummary} = require('../controllers/dashboardController.js');
const { protect } = require('../middlewares/authMiddleware.js');

// Admin only route
const adminOnly=(req,res,next)=>{
    if (req.user && req.user.role ==="admin") {
        next()
    }else{
        return res.status(403).json({message:"Admin access only"})
    }
}

router.get("/",protect,adminOnly,getDashboardSummary)

module.exports = router