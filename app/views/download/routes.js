const express = require('express')
const router = express.Router()
const path = require('path')


// Add your routes here - above the module.exports line


router.post('/download', function (req, res) {
    res.redirect('declaration');
})

router.post('/declaration', function (req, res) {
    res.redirect('declaration-person');
})

router.post('/declaration-person', function (req, res) {
    res.redirect('is-the-address-same');
})

router.post('/is-the-address-same', function (req, res) {

    let addressSame = req.session.data.addressSame;

    if (addressSame == "No") {
        res.redirect('address-question');
    } else {
        res.redirect('check-answers');
    }
})

router.post('/address-question', function (req, res) {

    let addressTypeDec = req.session.data.addressTypeDec;

    if (addressTypeDec == "Yes") {
        res.redirect('person-uk-address');
    } else {
        res.redirect('person-address');
    }
})

router.get('/person-address', function (req, res) {
    res.render(path.resolve(__dirname, 'person-address'), {
        countries: require('../../data/data').countries
    })
})

router.post('/person-address', function (req, res) {
    res.redirect('check-answers');
})

router.post('/person-uk-address', function (req, res) {
    res.redirect('check-answers');
})

router.post('/check-answers', function (req, res) {
    res.redirect('confirmation');
})

router.post('/confirmation', function (req, res) {
    res.redirect('file-download');
})

router.get('/file-download', function (req, res) {


    // Get the selected file
    const file = req.body.supplier
    // Set the file path
    const filePath = path.join(__dirname, '/supplier.pdf')
    // Send the file
    res.download(filePath)

})

module.exports = router
