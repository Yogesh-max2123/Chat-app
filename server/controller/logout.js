async function logout(req,res){
    try {
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        };


        return res.cookie('token', '', cookieOptions).status(200).json({
            
            message: "Logout successfully",
            success: true,
            data: null
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
        
    }
}
module.exports = logout;