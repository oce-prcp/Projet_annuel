import React from "react";
import { Card, Button } from "react-bootstrap";

import Invoice from "./InvoicePDF";


const InvoiceCard = () => {
  return (
    <Card>
      <Card.Header>Facture</Card.Header>
      <Card.Body>
        <Invoice id={userId} name={userName} address={userAddress} date ={UserDate} />
        <Button variant="primary">Télécharger</Button>
      </Card.Body>
    </Card>
  );
}

export default InvoiceCard;