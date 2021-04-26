import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginBottom: '10px'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: "bold",
  },
}));

const OrderItem = ({ image, name, price, quantity }) => {
  const classes = useStyles();
  let img = `https://ecom-backend-1.herokuapp.com/uploads/${image}`;

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>{name}</Typography>
        </AccordionSummary>
        <AccordionDetails style={{height: "150px"}}>
          <img alt={image} src={img} style={{ width: "150px" }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="overline" styles={{fontWeight: 'bold', fontSize: '16px'}}>Price: ${price}</Typography>
            <Typography variant="overline" styles={{fontWeight: 'bold', fontSize: '16px'}}>Quantity: {quantity}</Typography>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default OrderItem;
