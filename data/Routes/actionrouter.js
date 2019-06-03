const express = require("express");
const router = express.Router();

const dbActions = require("../helpers/actionModel");


router.get('/', async(req, res) => {
    try {
        const actions = await dbActions.get(res.body);
        res.status(200).json(actions);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Unable to get this at this time'
        });
    }

});

router.get('/:id', async (req, res) => {
    try {
      const action = await dbActions.get(res.params.id);
      if (action) {
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
    //   const action = req.body;
    try {
      const action= await dbActions.insert(req.body);
      res.status(201).json(action);
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
      const count = await dbActions.remove(req.params.id);
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
      const action  = await dbActions.update(req.params.id, req.body);
      if (action) {
        res.status(200).json(action);
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
  router.get('/:id/actions', (req, res) => {
    dbActions.get(req.params.id)
      .then(actions => {
        res.status(200).json(actions);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  


// 


    module.exports = router;

    
    