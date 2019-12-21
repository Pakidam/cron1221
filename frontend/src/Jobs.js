import React from "react";
import Job from "./Job";
import Typography from "@material-ui/core/Typography";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import JobModal from "./JobModal";

export default function Jobs({ jobs }) {
  // pagination
  const numbJobs = jobs.length;
  const numPages = Math.ceil(numbJobs / 50);
  const [activeStep, setActiveStep] = React.useState(0);
  const jobsOnPage = jobs.slice(activeStep * 50, activeStep * 50 + 50);

  // modal
  const [open, setOpen] = React.useState(false);
  const [selectedJob, selectJob] = React.useState({});
  function handleClickOpen() {
    setOpen(true);
  }
  function handleClose() {
    setOpen(false);
  }

  // step == 0, show 0-49

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  return (
    <div className="jobs">
      <JobModal open={open} job={selectedJob} handleClose={handleClose} />
      <Typography variant="h4" component="h1">
        Entry Level Software Jobs
      </Typography>
      <Typography variant="h6" component="h1">
        Found {numbJobs} Jobs
      </Typography>
      {jobsOnPage.map((job, i) => (
        <Job
          key={i}
          job={job}
          onClick={() => {
            console.log("clicked");
            handleClickOpen();
            selectJob(job);
          }}
        />
      ))}

      <div>
        Page {activeStep} of {numPages - 1}
      </div>
      <MobileStepper
        variant="progress"
        steps={Math.ceil(numbJobs / 50)}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
            Next
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Back
          </Button>
        }
      />
    </div>
  );
}
