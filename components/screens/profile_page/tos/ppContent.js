import React from 'react'
import { Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { tosStyles } from './tosStyles'

export const PPContent = () => {

    const ppJson = [
        {
            question:'Who are we?',
            answer:'For the purposes of applicable data protection laws, the data controller is Carlist.sg',
            subItem:[]
        },
        {
            question:'What information is covered by this Privacy Notice?',
            answer:'This Privacy Notice covers all personal information processed by the Carlist.sg which means information that (either in isolation or in combination with other information) enables you to be identified directly or indirectly.',
            subItem:[]
        },
        {
            question:'What information do we collect from you?',
            answer:'We may collect information about you from the following sources:',
            subItem : [
                {
                    title:'Information we receive from you',
                    body:'We may collect personal information (such as your name, postal and email address, previous addresses, telephone and fax number, occupation, assets, income, employment details, nationality, marital status, passport, National Insurance Number and Tax Identification Number or other identification details) that you provide to us when you:',
                    bullets:[
                        'submit applications to open an user ads account; and',
                        'submit applications to open an user ads account; and'
                    ]
                },
                {
                    title:'Information we collect about you',
                    body:'We may collect information about you from third party sources to perform bankruptcy search.',
                    bullets:[]
                },
            ]
        },
        {
            question:'How do we use your personal information?',
            answer:'',
            subItem : [
                {
                    title:'We will process, transfer and disclose your information to:',
                    body:'',
                    bullets:[
                        'Provide services;',
                        'Deal with any of your transactions;',
                        'Meet Compliance obligations;',
                        'Meet Compliance obligations;',
                        'Collect any money you owe us;',
                        'Perform credit checks and obtain or provide credit references;',
                        'For internal operational requirements of members of the Carlist.sg (including, for example, product development, insurance, audit and credit and risk management);',
                        'Manage our relationship with you; and',
                        'Verify your identify.'
                    ]
                },
                {
                    title:'Tracking or recording what you say or do',
                    body:'To help keep you and your data safe, we may record details of your interactions with us. We may record and keep track of conversations with us including phone calls, face-to-face meetings, letters, emails and any other kinds of communication. We may use these recordings to check your instructions to us, assess, analyses and improve our service, train our people, manage risk or to prevent and detect fraud and other crimes. We may also capture additional information about these interactions (e.g. telephone numbers that we are called from and information about devices or software that are used). We use closed circuit television (CCTV) in and around our offices and these may collect photos videos or voice recordings of you.',
                    bullets:[]
                },
            ]
        },
        {
            question:'Do we use your personal information for direct marketing?',
            answer:'With your permission, we may send you carefully selected information about our products and services. You have the right to opt out of receiving direct marketing at any time.'
        },
        {
            question:'Purpose of data processing and on what Legal basis?',
            answer:' Data is processed in order to provide online ads in the context of carrying out our contracts with our clients or to carry out pre-contractual measures that occur as part of a request. The purposes of data processing are primarily in compliance with the specific product (e.g. bank account, credit, deposits, client referral) and can include needs assessments, cash management and support, as well as carrying out transactions. You can find other details about the purposes of data processing in the relevant contract documents and terms and conditions.'
        },
        {
            question:'With which third parties do we share your personal information?',
            answer:'',
            subItem:[
                {
                    title:'',
                    body:'Your personal information are intended for the Carlist.sg but may be shared with third parties incertain circumstances:',
                    bullets:[]
                },
                {
                    title:'',
                    body:'Carlist.sg group of companies: We may share your personal information among our group of companies, including head office, its subsidiaries and branches, in order to open your account with us, administer our services and products, provide you with customer support, process your payments, understand your preferences, send you information about products and services that may be of interest to you and conduct the other activities described in this Privacy Notice. Other Service Providers: We may share personal information with the following categories of service provider:',
                    bullets:[
                        'infrastructure and IT service providers, including for email archiving.',
                        'marketing, advertising and communications agencies.',
                        'external auditors and advisers.',
                        'Republic Of Singapore government Authorities.',
                        'any introducing broker we provide instructions or referrals to or from whom we receive them',
                        'any third party we use to provide services to you.'
                    ]
                },
                {
                    title:'',
                    body:'In the course of providing such services, these service providers may have access to your personal information. However, we will only provide our service providers with personal information which is necessary for them to perform their services, and we require them not to use your information for any other purpose. We will use our best efforts to ensure that all our service providers keep your personal information secure. Third parties permitted by law: In certain circumstances, we may be required to disclose or share your personal information in order to comply with a legal or regulatory obligation (for example, we may be required to disclose personal information to the police, regulators, government agencies or to judicial or administrative authorities). We may also disclose your personal information to third parties where disclosure is both legally permissible and necessary to protect or defend our rights, matters of national security, law enforcement, to enforce our contracts or protect your rights or those of the public. Third parties connected with business transfers: We may transfer your personal information to third parties in connection with a reorganisation, restructuring, merger, acquisition or transfer of assets, provided that the receiving party agrees to treat your personal information in a manner consistent with this Privacy Notice. We will not sell your personal information to third parties.',
                    bullets:[]
                },
            ]
        },
        {
            question:'How do we protect your personal information?',
            answer:'We have implemented technical and organisational security measures to safeguard the personal information in our custody and control. Such measures include, for example, limiting access to personal information only to employees and authorised service providers who need to know such information for the purposes described in this Privacy Notice as well as other administrative,technical and physical safeguards. While we endeavour to protect our systems, sites, operations and information against unauthorised access, use, modification and disclosure, due to the inherent nature of the Internet as an open global communications vehicle and other risk factors, we cannot guarantee that any information, during transmission or while stored on our systems, will be absolutely safe from intrusion by others, such as hackers.'
        },
        {
            question:'How long do we keep your personal information?',
            answer:'We will retain your personal data in line with our data retention policy. This enables us to comply with legal and regulatory requirements or use it where we need to for our legitimate purposes such as managing your account and dealing with any disputes or concerns that may arise. We may need to retain information for a longer period where we need the information to comply with regulatory or legal requirements or where we may need it for our legitimate purposes (e.g. to help us respond to queries or complaints, fighting fraud and financial crime, responding to requests from regulators etc). When we no longer need to use personal information, we will remove it from our systems and records and/or take steps to anonymise it so that you can no longer be identified from it.'
        },
        {
            question:'How can you contact us?',
            answer:'If there are any questions or concerns regarding this Privacy Notice, please contact us at Help Center Screen'
        },

    ]

    return (
        <View>
            <Text style={tosStyles.ppHeader}>
                Carlist.sg Private Policy Notice
            </Text>
            <Text style={tosStyles.ppContent}>
                Carlist.sg (“Carlist.sg”) is committed to protecting your privacy and ensuring the highest level of security for
                your personal information. This Privacy Notice explains the types of personal information we collect,
                how we use that information, who we share it with, and how we protect that information.
                Please read the following carefully to understand our views and practices regarding your personal
                information.
            </Text>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={ppJson}
                keyExtractor={(item,index)=>index}
                renderItem={({item,index})=>
                    <View style={{marginBottom:20}}>
                        <Text style={tosStyles.ppQuestion}>{index+1}. {item.question}</Text>
                        {item.answer? <Text>{item.answer}</Text>:null}
                        {item.subItem?.map((sub,idx)=>
                            <View key={idx} style={tosStyles.ppSubTitle}>
                                {sub.title?<Text>{index+1}.{idx+1} {sub.title}</Text>:null}
                                {sub.body?<Text>{sub.body}</Text>:null}

                                {sub.bullets?.map((bullet,i)=>
                                    <View style={tosStyles.ppBullets}>
                                        <Text>• </Text>
                                        <Text key={i}>{bullet}</Text>
                                    </View>
                                )}
                            </View>
                        )}
                    </View>
                }
            />

            <Text>
                If there are any questions or concerns regarding this Privacy Notice, please contact us as follows:
            </Text>
        </View>
    )
}
