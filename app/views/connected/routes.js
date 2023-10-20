const express = require('express')
const router = express.Router()
const path = require('node:path')


// Add your routes here - above the module.exports line

router.post('/director-individual-ni', function (req, res) {
  res.redirect('director-address-type-ni');
})

router.post('/director-address-type-ni', function (req, res) {

  let addressTypeDirNi = req.session.data.addressTypeDirNi;

  if (addressTypeDirNi == "No") {
    res.redirect('dir-address-ni');
  } else {
    res.redirect('dir-address-uk-ni');
  }
})

router.get('/dir-address-ni', function (req, res) {
  res.render(path.resolve(__dirname, 'dir-address-ni'), {
    countries: require('../../data/data').countries
  })
})

router.post('/dir-address-ni', function (req, res) {
  res.redirect('dir-law-register-ni');
})

router.post('/dir-address-uk-ni', function (req, res) {
  res.redirect('dir-law-register-ni');
})

router.post('/dir-law-register-ni', function (req, res) {
  res.redirect('dir-company-number-question');
})

router.post('/dir-company-number-question', function (req, res) {

  let lawRegisterDirNi = req.session.data.lawRegisterDirNi;

  if (lawRegisterDirNi == "Yes") {
    res.redirect('dir-company-number');
  } else {
    res.redirect('check-answers-connected-person');
  }
})

router.post('/dir-company-number', function (req, res) {
  res.redirect('check-answers-connected-person');
})

router.post('/director-individual', function (req, res) {
  res.redirect('director-address-type');
})

router.post('/director-address-type', function (req, res) {

  let addressTypeDir = req.session.data.addressTypeDir;

  if (addressTypeDir == "No") {
    res.redirect('dir-address');
  } else {
    res.redirect('dir-address-uk');
  }
})

router.get('/director-individual', function (req, res) {
  res.render(path.resolve(__dirname, 'director-individual'), {
    nationalities: require('../../data/data').nationalities
  })
})

router.get('/dir-address', function (req, res) {
  res.render(path.resolve(__dirname, 'dir-address'), {
    countries: require('../../data/data').countries
  })
})

router.post('/dir-address', function (req, res) {
  res.redirect('check-answers-connected-person');
})

router.post('/dir-address-uk', function (req, res) {
  res.redirect('check-answers-connected-person');
})

router.post('/connected-question', function (req, res) {

  let connectedPsc = req.session.data.connectedPsc;

  if (connectedPsc == "Yes") {
    res.redirect('companies-question');
  } else {
    res.redirect('../suppliers-c/dashboard')
  }
})

router.post('/companies-question', function (req, res) {
  res.redirect('person-question');
})

router.post('/person-question', function (req, res) {
  res.redirect('persons');
})

router.post('/persons', function (req, res) {

  let connectedPersons = req.session.data.connectedPersons;

  if (connectedPersons == 'PSC Individual') {
    res.redirect('/connected/psc-individual');

  } else if (connectedPersons == 'Director individual') {
    res.redirect('/connected/director-individual');

  } else if (connectedPersons == 'Director not individual') {
    res.redirect('/connected/director-individual-ni');

  } else if (connectedPersons == 'Gov/Public Authority') {
    res.redirect('/connected/gov-organisation');

  } else if (connectedPersons == 'PSC not individual or Public Authority') {
    res.redirect('/connected/journey-page');

  } else if (connectedPersons == 'Parent / subsidiary') {
    res.redirect('/connected/journey-page');

  } else if (connectedPersons == 'Predecessor') {
    res.redirect('/connected/journey-page');

  } else if (connectedPersons == 'Stand in') {
    res.redirect('/connected/journey-page');

  } else {
    res.redirect('/connected/journey-page');
  }

})

router.post('/gov-organisation', function (req, res) {
  res.redirect('gov-address-type');
})

router.post('/gov-address-type', function (req, res) {

  let addressTypeGov = req.session.data.addressTypeGov;

  if (addressTypeGov == "No") {
    res.redirect('gov-service-address');
  } else {
    res.redirect('gov-address-uk');
  }
})

router.get('/gov-service-address', function (req, res) {
  res.render(path.resolve(__dirname, 'gov-service-address'), {
    countries: require('../../data/data').countries
  })
})

router.post('/gov-service-address', function (req, res) {
  res.redirect('gov-law-register');
})

router.post('/gov-address-uk', function (req, res) {
  res.redirect('gov-law-register');
})

router.post('/gov-law-register', function (req, res) {
  res.redirect('nature-of-control-gov');
})

router.post('/nature-of-control-gov', function (req, res) {
  res.redirect('date-registered-gov');
})

router.post('/date-registered-gov', function (req, res) {
  res.redirect('check-answers-connected-person');
})

router.get('/:index/remove-connected-person', function (req, res) {
  res.render(path.resolve(__dirname, 'remove-connected-person'));
});

router.post('/:index/remove-connected-person', function (req, res) {
  let removeConnectedPerson = req.session.data.removeConnectedPerson;
  const connectedPersons = req.session.data.connectedPersonArray || [];

  if (removeConnectedPerson == 'Yes' && connectedPersons.length) {
    const deleteIndex = req.params.index - 1;
    const maxIndex = connectedPersons.length || 0;

    if (deleteIndex <= maxIndex) {
      connectedPersons.splice(deleteIndex, 1);

      req.session.data.connectedPersonArray = connectedPersons;
      req.session.data.connectedPersonCount = connectedPersons.length;
    }
  }

  res.redirect('../add-another-connected-person');
});

router.get('/:index/check-answers-connected-person', function (req, res) {
  const data = req.session.data;
  const index = parseInt(req.params.index);
  const connectedPersons = data.connectedPersonArray || [];

  if (!connectedPersons.length) {
    return res.redirect('../add-another-connected-person');
  }

  const connectedPerson = connectedPersons[req.params.index - 1] || {};

  req.session.data = {
    ...data,
    ...connectedPerson,
    editConnectedPerson: index,
  };

  res.redirect('../check-answers-connected-person');
});

router.post('/check-answers-connected-person', function (req, res) {
  const data = req.session.data;
  const connectedPersons = data.connectedPersonArray || [];

  const connectedPerson = {
    connectedPerson: data.connectedPerson,
    connectedPersonDay: data.connectedPersonDay,
    connectedPersonMonth: data.connectedPersonMonth,
    connectedPersonYear: data.connectedPersonYear,
    individualDay: data.individualDay,
    individualMonth: data.individualMonth,
    individualYear: data.individualYear
  };

  if (data.editConnectedPerson) {
    connectedPersons[data.editConnectedPerson - 1] = connectedPerson;
  }
  else {
    connectedPersons.push(connectedPerson)
    data.connectedPersonArray = connectedPersons;
    data.connectedPersonCount = connectedPersons.length;
  }

  delete data.editConnectedPerson;

  res.redirect('add-another-connected-person');
});

router.post('/add-another-connected-person-route', function (req, res) {
  var sessionData = req.session.data;
  var connectedPersonArray = sessionData.connectedPersonArray || [];
  var connectedPerson = {
    "id": connectedPersonArray.length + 1,
    "connectedPerson": sessionData.connectedPersonName,
  }
  connectedPersonArray.push(connectedPerson);
  sessionData.connectedPersonArray = connectedPersonArray;
  sessionData.connectedPersonCount = connectedPersonArray.length;
  res.redirect('add-another-connected-person');
});

router.post('/add-another-connected-person', function (req, res) {
  delete req.session.data.editConnectedPerson;

  if (req.session.data.addAnotherConnectedPerson == 'Yes') {
    res.redirect('../connected/connected-question');
  }
  else {
    res.redirect('../suppliers-c/dashboard');
  }
});

router.post('/add-another-connected-person', function (req, res) {
  delete req.session.data.editConnectedPerson;

  if (req.session.data.connectedPersonCount == '10') {
    res.redirect('../connected/persons');
  }
  else {
    res.redirect('psc-organisation');
  }
});


router.get('/psc-individual', function (req, res) {
  res.render(path.resolve(__dirname, 'psc-individual'), {
    nationalities: require('../../data/data').nationalities
  })
})

router.post('/psc-individual', function (req, res) {
  res.redirect('address-type');
})

router.post('/address-type', function (req, res) {

  let addressType = req.session.data.addressType;

  if (addressType == "No") {
    res.redirect('psc-address');
  } else {
    res.redirect('psc-address-uk');
  }
})

router.get('/psc-address', function (req, res) {
  res.render(path.resolve(__dirname, 'psc-address'), {
    countries: require('../../data/data').countries
  })
})

router.post('/psc-address', function (req, res) {
  res.redirect('nature-of-control-psc');
})

router.post('/psc-address-uk', function (req, res) {
  res.redirect('nature-of-control-psc');
})

router.post('/nature-of-control-psc', function (req, res) {
  res.redirect('date-registered-psc');
})

router.post('/date-registered-psc', function (req, res) {
  res.redirect('psc-register');
})

router.post('/psc-register', function (req, res) {
  res.redirect('check-answers-connected-person');
})

/* 

router.get('/:index/remove-connected-person', function (req, res) {
    res.render(path.resolve(__dirname, 'remove-connected-person'));
  });
  
  router.post('/:index/remove-connected-person', function (req, res) {
    let removeIndividual = req.session.data.removeIndividual;
    const individuals = req.session.data.IndividualArray || [];
  
    if (removeIndividual == 'Yes' && individuals.length) {
        const deleteIndex = req.params.index - 1;
        const maxIndex = individuals.length || 0;
  
        if (deleteIndex <= maxIndex) {
            individuals.splice(deleteIndex, 1);
  
            req.session.data.individualArray = individuals;
            req.session.data.individualCount = individuals.length;
        }
    }
  
    res.redirect('../add-another-connected-person');
  });
  
  router.get('/:index/check-answers-connected-person', function (req, res) {
    const data = req.session.data;
    const index = parseInt(req.params.index);
    const individuals = data.individualArray || [];
  
    if (!individuals.length) {
        return res.redirect('../add-another-connected-person');
    }
  
    const individual = individuals[req.params.index - 1] || {};
  
    req.session.data = {
        ...data,
        ...individual,
        editIndividual: index,
    };
  
    res.redirect('../check-answers-connected-person');
  });
  
  router.post('/check-answers-connected-person', function (req, res) {
    const data = req.session.data;
    const individuals = data.individualArray || [];
    
    const individual = {
        individualName: data.individualName,
        individualDay: data.individualDay,
        individualMonth: data.individualMonth,
        individualYear: data.individualYear
    };
  
    if (data.editIndividual) {
        individuals[data.editIndividual - 1] = individual;
    }
    else {
        individuals.push(individual)
        data.individualArray = individuals;
        data.individualCount = individuals.length;
    }
  
    delete data.editIndividual;
    
    res.redirect('add-another-connected-person');
  });
  
  router.post('/add-another-connected-person-route', function (req, res) {
  var sessionData = req.session.data;
     var individualArray = sessionData.individualArray || [];
     var individual = {
         "id": individualArray.length + 1,
         "individual": sessionData.individualName,
     }
     individualArray.push(individual);
     sessionData.individualArray = individualArray;
     sessionData.individualCount = individualArray.length;
     res.redirect('add-another-connected-person');
  });
  
  router.post('/add-another-connected-person', function (req, res) {
    delete req.session.data.editIndividual;
  
    if (req.session.data.addAnotherIndividual == 'Yes') {
        res.redirect('../connected/persons');
         }
          else {
            res.redirect('../suppliers-c/dashboard');
    }
  });
  
  router.post('/add-another-connected-person', function (req, res) {
    delete req.session.data.editIndividual;
  
    if (req.session.data.individualCount == '10') {
        res.redirect('../connected/persons');
    }
    else {
        res.redirect('psc-individual');
    }
  });

*/

module.exports = router


