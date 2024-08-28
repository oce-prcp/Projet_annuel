import React, { Fragment } from 'react';
import { Image, Text, View, Page, Document, StyleSheet } from '@react-pdf/renderer';
import logo from '../assets/logo_data_save.png';

const Invoice = () => {

    const reciept_data = {
        "id": "642be0b4bbe5d71a5341dfb1",
        "invoice_no": "20200669",
        "address": "Adresse à insérer",
        "date": "24-09-2019",
        "items": [
            {
                "id": 1,
                "desc": "20Go d'espace de stockage",
                "qty": 1,
                "price": 20.00
            }
        ]
    };

    const styles = StyleSheet.create({
        page: { fontSize: 11, paddingTop: 20, paddingLeft: 40, paddingRight: 40, lineHeight: 1.5, flexDirection: 'column' },

        spaceBetween: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', color: "#3E3E3E" },

        titleContainer: { flexDirection: 'row', marginTop: 24 },

        logo: { width: 90 },

        reportTitle: { fontSize: 16, textAlign: 'center' },

        addressTitle: { fontSize: 11, fontWeight: 'bold' },

        invoice: { fontWeight: 'bold', fontSize: 20 },

        invoiceNumber: { fontSize: 11, fontWeight: 'bold' },

        address: { fontWeight: 400, fontSize: 10 },

        theader: { marginTop: 20, fontSize: 10, fontWeight: 'bold', paddingTop: 4, paddingLeft: 7, flex: 1, height: 20, backgroundColor: '#DEDEDE', borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth: 1 },

        theader2: { flex: 2, borderRightWidth: 0, borderBottomWidth: 1 },

        tbody: { fontSize: 9, paddingTop: 4, paddingLeft: 7, flex: 1, borderColor: 'whitesmoke', borderRightWidth: 1, borderBottomWidth: 1 },

        total: { fontSize: 9, paddingTop: 4, paddingLeft: 7, flex: 1.5, borderColor: 'whitesmoke', borderBottomWidth: 1 },

        tbody2: { flex: 2, borderRightWidth: 1 }
    });

    const InvoiceTitle = () => (
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <Image style={styles.logo} src={logo} />
                <Text style={styles.reportTitle}>Data Save</Text>
            </View>
        </View>
    );

    const Address = () => (
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <View>
                    <Text style={styles.invoice}>Facture</Text>
                    <Text style={styles.invoiceNumber}>Facture numéro: {reciept_data.invoice_no}</Text>
                </View>
                <View>
                    <Text style={styles.addressTitle}>20e Arrondissement</Text>
                    <Text style={styles.addressTitle}>Paris</Text>
                    <Text style={styles.addressTitle}>France</Text>
                </View>
            </View>
        </View>
    );

    const UserAddress = () => (
        <View style={styles.titleContainer}>
            <View style={styles.spaceBetween}>
                <View style={{ maxWidth: 200 }}>
                    <Text style={styles.addressTitle}>Facturé à</Text>
                    <Text style={styles.address}>
                        {reciept_data.address}
                    </Text>
                </View>
                <Text style={styles.addressTitle}>{reciept_data.date}</Text>
            </View>
        </View>
    );

    const TableHead = () => (
        <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
            <View style={[styles.theader, styles.theader2]}>
                <Text>Articles</Text>
            </View>
            <View style={styles.theader}>
                <Text>Prix</Text>
            </View>
            <View style={styles.theader}>
                <Text>Quantité</Text>
            </View>
            <View style={styles.theader}>
                <Text>Montant</Text>
            </View>
        </View>
    );

    const TableBody = () => (
        <Fragment>
            {reciept_data.items.map((receipt) => (
                <View key={receipt.id} style={{ width: '100%', flexDirection: 'row' }}>
                    <View style={[styles.tbody, styles.tbody2]}>
                        <Text>{receipt.desc}</Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{receipt.price.toFixed(2)}</Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{receipt.qty}</Text>
                    </View>
                    <View style={styles.tbody}>
                        <Text>{(receipt.price * receipt.qty).toFixed(2)}</Text>
                    </View>
                </View>
            ))}
        </Fragment>
    );

    const TableTotal = () => (
        <View style={{ width: '100%', flexDirection: 'row' }}>
            <View style={styles.total}>
                <Text></Text>
            </View>
            <View style={styles.total}>
                <Text> </Text>
            </View>
            <View style={styles.tbody}>
                <Text>Total</Text>
            </View>
            <View style={styles.tbody}>
                <Text>
                    {reciept_data.items.reduce((sum, item) => sum + (item.price * item.qty), 0).toFixed(2)}
                </Text>
            </View>
        </View>
    );

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <InvoiceTitle />
                <Address />
                <UserAddress />
                <TableHead />
                <TableBody />
                <TableTotal />
            </Page>
        </Document>
    );
};

export default Invoice;
