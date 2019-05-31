const express = require("express");
const router = express.Router();

const dbActions = require("../helpers/actionModel");

router.get('/', (req, res) => {
    dbActions
     .get()
     .then(action => {
         res.status(200).jason(action);
     })
     .catch(err => {
         res.jason(500).jason({ errorMessage: "Unable to get this at this time"});
     });
});

router.post('/', (req,res) => {
    const action = req.body;
    console.log('this is a 35:",action');
    if (action.project_id && action.notes && action.description) {
        dbActions
            .insert(action)
            .then(newAction => {
                console.log("line 43:", newAction);
                res.jason(newAction);
            })
            .catch(err => {
                res
                    .status(500)
                    .jason({ errorMessage: "COuld not create this at this time" });
            });

        } else {
            res
                .status(400)
                .jason({ errorMessage: "Please enter details and description"});
        }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const action = req.body;
    if (action.notes && action.description && action.project_id) {
        dbActions
         .update(id, action)
         .then(newAction => {
             dbActions
              .get(newAction.id)
              .then(action => {
                  action ? res.json(action) :res.status(400).jason({ Message: "Did not find it"});
              })
              .catch(err => {
                  res
                  .status(500)
                  .json({ errorMessage: "was unable to get your action"});
              });

         })
         .catch(err => {
             res
                .status(500)
                .json({ errorMessage: "Could not update the action with id"});
         });
        } else {
            res
            .status(400)
            .jason({ errorMessage: "The following is reuired description , notes, and id" })
        }
   });

    router.delete('/:id', (req,res) => {
        const { id } = req.params;
        dbActions
            .remove(id)
            .then(count => {
                count
                ? res.json({ Message: " It is gone , deleted"})
                : res
                    .status(404)
                    .json({ Message: "Could not delete you request with id"});
            })

            .catch(err => {
                res
                    .status(500)
                    json({ errorMessage: "Could not delete your requst now"});
            });
    });


    module.exports = router;