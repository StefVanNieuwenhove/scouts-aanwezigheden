'use client';

import React from 'react';
import {
  Document,
  Page,
  PDFViewer,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import { MemberWithActivities } from '@/types/member';

type EvaluationMembersPdfProps = {
  title: string;
  membersAbove: MemberWithActivities[] | undefined;
  membersBelow: MemberWithActivities[] | undefined;
};

const EvaluationMembersPdf = ({
  title,
  membersAbove,
  membersBelow,
}: EvaluationMembersPdfProps) => {
  return (
    <PDFViewer width={'100%'} height={'100%'} showToolbar>
      <Document
        title={title}
        author='Stef van Nieuwenhove'
        subject='50% regel'
        language='nl'
        style={{
          height: '100%',
        }}>
        <Page size='A4' style={{ padding: 10 }}>
          <View>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.page}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Mee op kamp</Text>
              <View>
                {membersAbove?.map((member) => (
                  <Text key={member.id} style={styles.name}>
                    {member.firstName} {member.lastName}
                  </Text>
                ))}
              </View>
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Niet mee op kamp</Text>
              <View>
                {membersBelow?.map((member) => (
                  <Text key={member.id} style={styles.name}>
                    {member.firstName} {member.lastName}
                  </Text>
                ))}
              </View>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default EvaluationMembersPdf;

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    textDecoration: 'underline',
    width: '100%',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textDecoration: 'underline',
  },
  name: {
    fontSize: 12,
  },
});
