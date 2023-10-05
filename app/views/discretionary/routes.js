const express = require('express')
const router = express.Router()
const path = require('node:path')


// Add your routes here - above the module.exports line


router.post('/exclusion-grounds', function (req, res) {

    let exclusion = req.session.data.exclusion;
    let startQuestion = req.session.data.startQuestion;

    if (exclusion == 'no' && startQuestion == 'Company') {
        res.redirect('/suppliers-c/dashboard');

    } else if (exclusion == 'no') {
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
    
        let addressTypeDis = req.session.data.addressTypeDis;
    
        if (addressTypeDis == "Yes") {
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
        exclusion: data.eventSubDis,
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
         "Exclusion": sessionData.exclusion, 
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
        res.redirect('../suppliers-d/dashboard');
    }
  });
  
  router.post('/add-another-exclusion', function (req, res) {
    delete req.session.data.editExclusion;
  
    if (req.session.data.ExclusionCount == '10') {
        res.redirect('non-individual-core-data');
    }
    else {
        res.redirect('exclusion-grounds');
    }
  });
  

module.exports = router




