

const { Router } = require('express');
const { EmployeeModel } = require('../model/employee.model');
const { auth } = require('../middleware/auth');

const empRouter = Router()


// employees all routes are protected. (need login /  jwt token)
// empRouter.use(auth)




empRouter.post('/', async (req, res) => {
    try {
        console.log(req.body);

        const newemp = new EmployeeModel(req.body)

        await newemp.save()

        return res.status(201).send({
            isError: false,
            msg: "Employee data has been successfully added",
            data: newemp
        })

    } catch (error) {

        return res.status(500).send({
            isError: true,
            msg: error.message
        })

    }
})





empRouter.get('/', async (req, res) => {

    let { FirstName, LastName, Department, page, limit, sortbysalary } = req.query;

    try {

        FirstName = new RegExp(FirstName, 'i')
        LastName = new RegExp(LastName, 'i')
        Department = new RegExp(Department, 'i')

        if (sortbysalary === 'asc') {
            sortbysalary = 1
        } else if (sortbysalary === 'desc') {
            sortbysalary = -1
        } else {
            sortbysalary = ''
        }

        let data;

        if (sortbysalary) {

            data = await EmployeeModel.find({ FirstName, LastName, Department }).limit(limit).skip(limit * (page - 1)).sort({ Salary: sortbysalary })

        } else {

            data = await EmployeeModel.find({ FirstName, LastName, Department }).limit(limit).skip(limit * (page - 1))

        }


        return res.status(200).send({
            isError: false,
            msg: "All Employees data successfuly fetched",
            data
        })

    } catch (error) {

        return res.status(500).send({
            isError: true,
            msg: error.message
        })

    }
})


empRouter.get('/:id', async (req, res) => {
    try {

        const data = await EmployeeModel.findById({ _id: req.params.id })

        return res.status(200).send({
            isError: false,
            msg: "Employee data successfuly fetched",
            data
        })

    } catch (error) {

        return res.status(500).send({
            isError: true,
            msg: error.message
        })

    }
})





const editEmployee = async (req, res) => {

    const { id } = req.params;

    try {

        const data = await EmployeeModel.findByIdAndUpdate({ _id: id }, req.body)

        console.log(data);

        return res.status(200).send({
            isError: false,
            msg: "Employee data successfuly updated"
        })

    } catch (error) {

        return res.status(500).send({
            isError: true,
            msg: error.message
        })

    }
}


empRouter.put('/:id', editEmployee)

empRouter.patch('/:id', editEmployee)


empRouter.delete('/:id', async (req, res) => {
    try {

        const data = await EmployeeModel.findByIdAndDelete({ _id: req.params.id })

        console.log(data);

        return res.status(200).send({
            isError: false,
            msg: "Employee data successfuly fetched"
        })

    } catch (error) {

        return res.status(500).send({
            isError: true,
            msg: error.message
        })

    }
})


module.exports = {
    empRouter
}