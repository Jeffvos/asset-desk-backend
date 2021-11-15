const router = require('express').Router();
const verify = require('../validation/verify-token');
const Employee = require('../models/employees.model');

router.route('/').get(verify, (req, res) => {
  Employee.find()
    .then(employees => res.json(employees))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(verify, (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const department = req.body.department;
  const startDate = req.body.startdate;

  newEmployee = new Employee({
    name,
    email,
    department,
    startDate,
  });

  newEmployee
    .save()
    .then(() => res.json('Added user ' + name))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get(verify, (req, res) => {
  Employee.findById(req.params.id)
    .then(employee => res.json(employee))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete(verify, (req, res) => {
  Employee.findByIdAndDelete(req.params.id)
    .then(() => res.json('Employee deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(verify, (req, res) => {
  Employee.findById(req.params.id)
    .then(employee => {
      employee.username = req.body.username;
      employee.email = req.body.emaill;
      employee.department = req.body.department;
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
