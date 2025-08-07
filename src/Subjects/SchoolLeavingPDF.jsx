
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { right } from '@popperjs/core';

const styles = StyleSheet.create({
  page: {
    padding: 10,
    fontSize: 10,
    fontFamily: 'Times-Roman',
    lineHeight: 1.1,
    flexDirection: 'column',
  },
  outerBox: {
    borderWidth: 3,
    borderColor: '#05203d',
    borderRadius: 10,
    backgroundColor:'#FFFADC',
    padding: 5,
    flexGrow: 1,
    width: '100%',
  },
  innerBox: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    fontWeight:'bold',
    margin: 10,
    textAlign: 'center',
    textDecoration: 'underline',
    textDecorationStyle: 'solid',
    textDecorationThickness: '1px',
  },

  section: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  label: {
    width: '40%',
    fontSize:15,
    fontWeight:'bold',
    marginBottom:'2px'
  },
  value: {
    fontSize:15,
    width: '60%',
  },
  redLine: {
    height: 1.3,
    backgroundColor: 'red',
    marginVertical: 3,
  },
  blueLine: {
    height: 1,
    width: '18%',
    backgroundColor: 'blue',
    marginVertical: 3,
  },
  footer: {
    marginTop: 11,
    textAlign: 'center',
  }
});

// ✅ This must be a pure function, no hooks, no state, no React lifecycle
export function SchoolLeavingPDF() {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.outerBox}>
          <View style={styles.innerBox}>
            <View style={styles.header}>
              <Text style={{fontSize:'25px',padding:15,color:'navy'}}>JEEVAN ADARSH VIDHYALAY</Text>
              <Text style={{fontSize:'12px',padding:2,fontWeight:'bold'}}>SCHOOL ID: 1152593</Text>
              <Text style={{fontSize:'12px',padding:2,fontWeight:'bold'}}>EXT., Delhi-110053</Text>
              <Text style={{fontSize:'12px',padding:2,fontWeight:'bold'}}>Phone No: 9968736446</Text>
            </View>
            <View style={styles.redLine} />
            <Text style={styles.title}>School Leaving Certificate</Text>
            {/* <View style={styles.titleContainer}>
  <Text style={styles.title}>School Leaving Certificate</Text>
  <View style={styles.customUnderline} />
</View> */}
            <Text style={{ textAlign: 'center', paddingTop: 10, fontSize:'14px' }}>
              This certifies that the following student has left the institution:
            </Text>
            <Text style={{padding:10,fontSize:'15px'}}>TC.NO: 24</Text>
            <View style={styles.blueLine} />

            {[
              ['Student Name:', 'Shayaan'],
              ['Admission No:', 'ADM/2025/0316'],
              ['Aadhar No:', '000000000000'],
              ["Father's Name:", 'Zahid Ali'],
              ["Mother's Name:", 'Nuzhat Tamkeen'],
              ['DOB:', '04/06/2025'],
              ['In Words:', 'Fourth June Two Thousand Twenty-five'],
              ['Place of Birth:', 'Delhi'],
              ['State:', 'Delhi'],
              ['Country:', 'India'],
              ['Nationality:', 'Indian'],
              ['Address:', 'h1603'],
              ['Religion:', 'N/A'],
              ['Caste:', 'General'],
              ['Admission Date:', '04/06/2025'],
              ['Leaving Date:', '6/4/2025'],
              ['Reason for Leaving:', 'non'],
              ['Last Class Attended:', '10'],
              ['Remarks:', '—'],
              ['Dues Amount:', '0'],
              ['Issued Date:', '6/4/2025'],
            ].map(([label, value], index) => (
              <View key={index} style={styles.section}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.value}>{value}</Text>
              </View>
            ))}

            <View style={styles.footer}>
              <Text style={{fontSize:'16px',padding:5}}>
                Certified that the above information is in accordance with the College Register.
              </Text>
              <Text style={{fontSize:'16px',padding:5}}>
                (No change in any entry shall be made except by the authority issuing it.)
              </Text>
              <Text style={{ marginTop: 15, fontWeight: 'bold' ,fontSize:'20px',color:'navy',textAlign:right}}>Principal Signature</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}