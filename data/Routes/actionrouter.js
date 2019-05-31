const express = require("express");
const router = express.Router();

const dbActions = require("../helpers/actionModel");

router.get('/', (req, res) => {
    dbActions
     .get()
     .then(get => {
         res.status(200).jason(action);
     })
     .catch(err => {
         res.jason(500).jason({ errorMessage: "Unable to get this at this time"});
     })
});

router.post('/', (req,res) => {
    const NewAction = req.body;
        
    dbActions. insert(newAction)
         .then( action => {
             res.status(200).jason(action)
         })
         .catch(error => {
             res.status(500).json({ error:{message:"Sorry did not go through"}});

         })
});

router.put('/:id', (req, res) => {
    const updateAction = req.body
    const id = req.params.id

        dbActions.update(id, updateAction)
            .then( action => {
                res.status(200).jason(action)
            })
            .catch(error => {
                res.status(500).jason({ error: {message: " sorry this is a no go"}});
            })

        });

        router.delete("/:id", (req,res) => {
            const actionid = req.params.id;

            dbActions.remove(actionid)
                .then(action => {
                    if (action) {
                        dbActions.remove(actionid)
                        .then(removeAction => {
                            res.status(201).json(releaseEvents)
                        })
                    } else {
                        res.status(404).jason({error:{message: "SOrry could not delete"}});
                    }
                })
                .catch(error => {
                    res.status(500).json({error: {message: "Unable to delete this item at this time"}});
                });
            });
                    
    


    module.exports = router;