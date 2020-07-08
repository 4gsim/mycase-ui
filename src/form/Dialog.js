import React, { useState } from "react";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import {
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import { Form } from "react-material-formio";

function FormDialog(props) {
  const { open, onClose, onSubmit, form } = props;
  const [submission, setSubmission] = useState();

  function handleSubmit() {
    onSubmit(submission);
  }

  function onChange(change) {
    if (change.changed) {
      setSubmission({
        isValid: change.isValid,
        data: change.data,
      });
    }
  }

  return (
    <Dialog open={open}>
      <DialogTitle id="simple-dialog-title">Form Dialog</DialogTitle>
      <DialogContent>
        <Form form={form} onChange={onChange}></Form>
      </DialogContent>
      <DialogActions>
        <Button disabled={!submission.isValid} onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

FormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  form: PropTypes.any.isRequired,
};

export default FormDialog;
