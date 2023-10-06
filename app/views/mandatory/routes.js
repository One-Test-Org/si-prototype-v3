const express = require('express')
const router = express.Router()
const path = require('node:path')


// Add your routes here - above the module.exports line


router.post('/exclusion-grounds', function (req, res) {

    let exclusion1 = req.session.data.exclusion1;
    let exclusion2 = req.session.data.exclusion2;
    let exclusion3 = req.session.data.exclusion3;
    let exclusion4 = req.session.data.exclusion4;
    let exclusion5 = req.session.data.exclusion5;
    let exclusion6 = req.session.data.exclusion6;
    let exclusion7 = req.session.data.exclusion7;
    let exclusion8 = req.session.data.exclusion8;
    let exclusion9 = req.session.data.exclusion9;
    let exclusion10 = req.session.data.exclusion10;
    let exclusion11 = req.session.data.exclusion11;
    let exclusion12 = req.session.data.exclusion12;
    let exclusion13 = req.session.data.exclusion13;
    let startQuestion = req.session.data.startQuestion;

    if (exclusion1 == '' && exclusion2 == '' && exclusion3 == '' && exclusion4 == '' && exclusion5 == '' && exclusion6 == '' && exclusion7 == '' && exclusion8 == '' && exclusion9 == '' && exclusion10 == '' && exclusion11 == '' && exclusion12 == '' && exclusion13 == '' && startQuestion == 'Company') {
        res.redirect('/suppliers-c/dashboard');

    } else if ( startQuestion == 'Individual') {
        res.redirect('/suppliers-d/dashboard');
    } else {
        res.redirect('event-subject');
    }
    
})

router.post('/event-subject', function (req, res) {
    res.redirect('subject-name');
})

router.post('/subject-name', function (req, res) {
    res.redirect('email-address');
})  

router.post('/email-address', function (req, res) {
    res.redirect('address-type');
})

router.post('/address-type', function (req, res) {

    let addressType = req.session.data.addressType;
  
    if (addressType == "Yes") {
        res.redirect('subject-uk-address');
      } else {
        res.redirect('subject-address');
      }
  })

router.get('/subject-address', function (req, res) {
    res.render(path.resolve(__dirname, 'subject-address'), {
      countries: require('../../data/data').countries
    })
  })


router.post('/subject-uk-address', function (req, res) {
    res.redirect('event-documents');
})

router.post('/subject-address', function (req, res) {
    res.redirect('event-documents');
})

router.post('/event-documents', function (req, res) {
    res.redirect('event-mitigation');
})

router.post('/event-mitigation', function (req, res) {
    res.redirect('event-date');
})

router.post('/event-date', function (req, res) {
    res.redirect('check-answers');
})

// Add another pattern

router.get('/:index/remove-exclusion', function (req, res) {
    res.render(path.resolve(__dirname, 'remove-exclusion')); 
  });
  
  router.post('/:index/remove-exclusion', function (req, res) {
    let removeExclusion = req.session.data.removeExclusion;
    const exclusions = req.session.data.exclusionArray || [];
  
    if (removeExclusion == 'Yes' && exclusions.length) {
        const deleteIndex = req.params.index - 1;
        const maxIndex = exclusions.length || 0;
  
        if (deleteIndex <= maxIndex) {
            exclusions.splice(deleteIndex, 1);
  
            req.session.data.exclusionArray = exclusions;
            req.session.data.exclusionCount = exclusions.length;
        }
    }
  
    res.redirect('../add-another-exclusion');
  });
  
  router.get('/:index/check-answers', function (req, res) {
    const data = req.session.data;
    const index = parseInt(req.params.index);
    const exclusions = data.exclusionArray || [];
  
    if (!exclusions.length) {
        return res.redirect('../add-another-exclusion');
    }
  
    const exclusion = exclusions[req.params.index - 1] || {};
  
    req.session.data = {
        ...data,
        ...exclusion,
        editExclusion: index,
    };
  
    res.redirect('../check-answers');
  });
  
  router.post('/check-answers', function (req, res) {
    const data = req.session.data;
    const exclusions = data.exclusionArray || [];
    
    const exclusion = {
        exclusion: data.eventSub,
        convictionDay: data.convictionDay,
        convictionMonth: data.convictionMonth,
        convictionYear: data.convictionYear
    };
  
    if (data.editExclusion) {
        exclusions[data.editExclusion - 1] = exclusion;
    }
    else {
        exclusions.push(exclusion)
        data.exclusionArray = exclusions;
        data.exclusionCount = exclusions.length;
    }
  
    delete data.editExclusion;
    
    res.redirect('add-another-exclusion');
  });
  
  router.post('/add-another-exclusion-route', function (req, res) {
  var sessionData = req.session.data;
     var exclusionArray = sessionData.exclusionArray || [];
     var exclusion = {
         "id": exclusionArray.length + 1,
         "exclusion": sessionData.exclusion, 
     }
     exclusionArray.push(exclusion);
     sessionData.exclusionArray = exclusionArray;
     sessionData.exclusionCount = exclusionArray.length;
     res.redirect('add-another-exclusion');
  });
  
  router.post('/add-another-exclusion', function (req, res) {
    delete req.session.data.editExclusion;
  
    if (req.session.data.addAnotherExclusion == 'Yes') {
        res.redirect('exclusion-grounds');
    }
    else {

        let startQuestion = req.session.data.startQuestion;
        if (startQuestion == 'Company') {
            res.redirect('../suppliers-c/dashboard');
        }
        else {
            res.redirect('../suppliers-d/dashboard');
        }
    }
  });
  
  router.post('/add-another-exclusion', function (req, res) {
    delete req.session.data.editExclusion;
  
    if (req.session.data.exclusionCount == '10') {
        res.redirect('non-individual-core-data');
    }
    else {
        res.redirect('exclusion-grounds');
    }
  });
  

module.exports = router


