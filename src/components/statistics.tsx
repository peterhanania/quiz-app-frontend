import { useState, forwardRef, useCallback } from "react";
import { makeStyles } from "@mui/styles";
import { useSnackbar, SnackbarContent, CustomContentProps } from "notistack";
import { StatOptions } from "../utils/types";
import clsx from "clsx";
import Collapse from "@mui/material/Collapse";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles(() => ({
  root: {
    "@media (min-width:600px)": {
      minWidth: "344px !important",
    },
  },
  card: {
    width: "100%",
  },

  actionRoot: {
    padding: "8px 8px 8px 16px",
    justifyContent: "space-between",
  },
  icons: {
    marginLeft: "auto",
  },
  expand: {
    padding: "8px 8px",
    transform: "rotate(0deg)",
    transition: "all .2s",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  paper: {
    padding: 16,
  },
  checkIcon: {
    fontSize: 20,
    paddingRight: 4,
  },
  button: {
    padding: 0,
    textTransform: "none",
  },
}));

interface StatisticsProps extends CustomContentProps {
  statistics?: StatOptions;
}

const Statistics = forwardRef<HTMLDivElement, StatisticsProps>(
  ({ id, ...props }, ref) => {
    const classes = useStyles();
    const { closeSnackbar } = useSnackbar();
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = useCallback(() => {
      setExpanded((oldExpanded) => !oldExpanded);
    }, []);

    const handleDismiss = useCallback(() => {
      closeSnackbar(id);
    }, [id, closeSnackbar]);

    const statOptions = props.statistics;

    return (
      <SnackbarContent ref={ref} className={classes.root}>
        <Card className={classes.card + " bg-gray-300 dark:bg-[#15181a]"}>
          <CardActions classes={{ root: classes.actionRoot }}>
            <Typography
              variant="body2"
              className="text-gray-900 dark:text-gray-200"
            >
              {props.message}
            </Typography>
            <div className={classes.icons}>
              <IconButton
                aria-label="Show more"
                size="small"
                className={
                  clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  }) + " text-black dark:text-white"
                }
                onClick={handleExpandClick}
              >
                <ExpandMoreIcon />
              </IconButton>
              <IconButton
                size="small"
                className={classes.expand + " text-black dark:text-white"}
                onClick={handleDismiss}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </div>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Paper className={classes.paper + " bg-gray-300 dark:bg-[#15181a]"}>
              <ul className="list-dsc text-gray-900 dark:text-gray-200">
                <li>Score: {statOptions?.score}</li>
                <li
                  dangerouslySetInnerHTML={{
                    __html: `Question: ${statOptions?.question}`,
                  }}
                ></li>
                <li>Your Answer: {statOptions?.answer}</li>
                <li>Correct Answer: {statOptions?.correctAnswer}</li>
              </ul>
            </Paper>
          </Collapse>
        </Card>
      </SnackbarContent>
    );
  }
);

Statistics.displayName = "statistics";

export default Statistics;
