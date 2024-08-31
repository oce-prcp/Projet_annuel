import React  from "react";
import { Card, Button } from "react-bootstrap";
import Invoice from "./InvoicePDF";
import { HiOutlineDownload } from 'react-icons/hi'
import { PDFDownloadLink } from "@react-pdf/renderer";

const InvoiceCard = ({ invoiceId, userId, userName, userFirstName, userAddress, invoiceDate }) => {
  
  const invoiceDateFormat = new Date(invoiceDate).toLocaleDateString('fr-FR');

  return (
    <Card style={{ marginBottom: '20px' }}>
      <Card.Header>Facture du { invoiceDateFormat }</Card.Header>
      <Card.Body>
      <PDFDownloadLink document={<Invoice invoiceId={invoiceId} userId={userId} userName={userName} userFirstName={userFirstName} userAddress={userAddress} invoiceDate={invoiceDate}/>} fileName='invoice.pdf'>
            <Button className='mt-3'>
                <HiOutlineDownload size={14}/>
                <span>Télécharger une facture</span>
            </Button>
        </PDFDownloadLink>

      </Card.Body>
    </Card>
  );
}

export default InvoiceCard;