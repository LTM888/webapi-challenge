const express = require("express");
const router = express.Router();

const dbProject = require('../helpers/projectModel');

router.get('/', async(req, res) => {
  try {
      const projects = await dbProject.get(res.body);
      res.status(200).json(projects);
  } catch (error) {
      console.log(error);
      res.status(500).json({
          message: 'Unable to get this at this time'
      });
  }

});

router.get('/:id', async (req, res) => {
  try {
    const project = await dbProject.get(res.params.id);
    if (project) {
      res.status(200).json();
    } else {
      res.status(404).json({ message: 'ID not found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the ID',
    });
  }
});

router.post('/', async (req, res) => {
  //   const project = req.body;
  try {
    const project= await dbProject.insert(req.body);
    res.status(201).json(project);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the id',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const count = await dbProject.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The id has been nuked' });
    } else {
      res.status(404).json({ message: 'The id could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the id',
    });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const project  = await dbProject.update(req.params.id, req.body);
    if (project) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: 'The id could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the id',
    });
  }
});

// /api//:id/messages
router.get('/:id/projects', (req, res) => {
  dbProject.get(req.params.id)
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});



// 


  module.exports = router;
module.exports = router;

