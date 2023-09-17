const express = require('express');
const bodyparser = require('body-parser');
const env = require('dotenv').config();
const mongoose = require('mongoose');
const cors=require('cors')



const app = express()

app.use(bodyparser.urlencoded({ extended: false }))
app.use(express.static('./public'))
app.use(cors())
app.use(bodyparser.json())

const User = mongoose.model('User', {
    first_name: String,
    last_name: String,
    email: String,
    avatar: String
});

app.get('/Users', async (req, res) => {
    try {
        const users = await User.find()
        res.send({
            status: 'Success',
            data: users
        })

    } catch (err) {
        res.status(500).send({
            status: 'Failed',
            message:'internal server error'
        })
    }
})

app.post('/Users', async (req, res) => {
    try {
        console.log(req.body)
        const{first_name,last_name,email,avatar}=req.body

        await User.create({first_name,last_name,email,avatar})

        const users = await User.find()
        res.send({
            status: 'Success',
            message:'User added successfully'
        })

    } catch (err) {
        res.status(500).send({
            status: 'Failed',
            message:'internal server error'
        })
    }
})



app.get('/', (req, res) => {
    res.send({
        status: 'Success',
        message: 'Good to go'
    })

})


app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.Mongoose_URL).then(console.log(`Server is running on port '${process.env.PORT}`))
        .catch(err => console.log(err))
})