import React  from "react";
import { Card, Button } from "react-bootstrap";
import Invoice from "./InvoicePDF";
import { HiOutlineDownload } from 'react-icons/hi'
import { PDFDownloadLink } from "@react-pdf/renderer";

const InvoiceCard = ({ invoiceId, userId, userName, userFirstName, userAddress, invoiceDate }) => {
  const invoiceDateFormat = new Date(invoiceDate).toLocaleDateString('fr-FR');


  return (
    <tr>
      <td>{invoiceId}</td>
      <td>{invoiceDateFormat}</td>
      <td>{userName}</td>
      <td>{userFirstName}</td>
      <td>{userAddress}</td>
      <td>
        <PDFDownloadLink
          document={
            <Invoice
              invoiceId={invoiceId}
              userId={userId}
              userName={userName}
              userFirstName={userFirstName}
              userAddress={userAddress}
              invoiceDate={invoiceDate}
            />
          }
          fileName={`invoice_${invoiceId}.pdf`}
        >
          <button variant="info" size="sm" className="button-invoice">
            <img src="/img/download-icon.png" alt="download" class="action-icon"></img>
          </button>
        </PDFDownloadLink>
      </td>
    </tr>
  );
};

export default InvoiceCard;