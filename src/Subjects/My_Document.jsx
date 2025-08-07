// components/MyDocument.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    border: '1pt solid #ccc',
  },
  label: {
    fontWeight: 'bold',
  }
});

// Document Component
const My_Document = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Sample PDF Report</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Name:</Text> <Text>John Doe</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Course:</Text> <Text>React Development</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Date:</Text> <Text>June 23, 2025</Text>
      </View>
    </Page>
  </Document>
);

export default My_Document;
