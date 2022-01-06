import React from 'react'
import { FlatList, ScrollView, Text, View } from 'react-native'
import { theme } from '../../../contants/colors'

export const TOSContentText = (props) => {
    const {data , parentIndex} = props
    return(
        <View>
            <FlatList
                data={data}
                keyExtractor={(item,index)=>index}
                renderItem={({item , index})=>(
                    <View
                        style={{
                            display:'flex',
                            flexDirection:'row',
                            alignItems:'flex-start',
                            marginVertical:10,
                        }}
                    >
                        <Text
                            style={{
                                marginRight:10
                            }}
                        >
                            {+parentIndex+1}.{+index+1} 
                        </Text>
                        <Text
                            style={{
                                fontSize:16,
                                color:theme.black,
                                textAlign:'justify',
                                paddingRight:35
                            }}
                        >
                            {item}
                        </Text>
                    </View>
                )}
            />
        </View>
    )
}

export const TOSContent = () => {

    const data = [
        {
            id:'1',
            title:'ACCEPTANCE OF TERMS',
            content:[
                'Your use of our Services is subject to these Terms. By using the Services ,you are deemed to have accepted and agree to be bound by these Terms. We may make changes to these Terms from time to time. We may notify you ofsuch changes by any reasonable means, including by posting the revised version of these Terms on this website. Your use of the Services following changes to these Terms will constitute your acceptance of those changes.'
            ]
        },
        {
            id:'2',
            title:'ABILITY TO ACCEPT TERMS',
            content:[
                'You affirm that you are either more than 18 years of age, or possess legal parental or guardian consent, and arefully able and competent to enter into the terms, conditions, obligations, affirmations, representations, and warranties set forth in these Terms, and to abide by and comply with these Terms.'
            ]
        },
        {
            id:'3',
            title:'ACCESS SERVICES',
            content:[
                'You are responsible for all access to our Service using your internet connection, even if the access is by another person. We will use reasonable efforts to ensure that the Services is available at all times. However, we cannot guarantee that the Services or any individual function or feature of the Services will always be available and/or error free. Our Services may be unavailable during periods when we are implementing upgrades or carrying our essential maintenance.'
            ]
        },
        {
            id:'4',
            title:'USER OBLIGATIONS',
            content:[
                'As a condition of your use of this Web Site, you warrant and undertake to carlist.sg that you will not use this Web Site for any purpose that is illegal under any relevant laws or prohibited by the Terms of Service.',
                'You also acknowledge and agree that any decision of carlist.sg under the Terms of Service shall be final, conclusive and binding upon you.',
                'By the way of example,and not as a limitation, you agree that when using this Web Site and its associated Services, you warrant and undertake that you will not: Harmful to our reputation or the reputation of any of our affiliates; You retain the legal right and technical ability to immediately remove the link at any time, following a request by us to do so. We reserve the right and technical ability to immediately remove the link at any time, following a request by us to do so. We reserve the right ti require you to immediately remove any link to our Services at any time and you shall immediately comply with any request by us to remove any such link.'
            ]
        },
        {
            id:'5',
            title:'INTELLECTUAL PROPERTY',
            content:[
                'The intellectal property rights in our Services and all of text, pictures, videos, graphics, user interface, visual interface, trademarks, logos, applications, programs, computer codes and other content made available on it are owned by us and our licensors. You may not print or otherwise make copies of any such content without our express prior permission.'
            ]
        },
        {
            id:'6',
            title:'CENSORSHIP',
            content:[
                'Carlist.SG has no obligation to monitor the communities. However, Carlist.SG reserves the right at all times to disclose any information as necessary to satisfy any applicable law,regulation, legal process or governmental request, or to edit, refuse to post, or to remove any information or materials, in whole or in part, in ONESHIFT\'s sole decretion. Carlist.SG does not control the content posted via the Services and, as such, does not guarantee the accuracy, integrity, or quality of such content that is offensive, indecent and objectionable. Carlist.SG does not control or endorse the content, messages or information, found in any community and , therefore, Carlist.SG specifically disclaims any liability with regard to the communities and any actions resulting from your participation in any community. Forum moderators are not authorised Carlist.SG spokespersons, and their views do not necessarily reflect those of Carlist.SG'
            ]
        },
        {
            id:'7',
            title:'COLLECTION OF PERSONAL INFORMATION',
            content:[
                'We may collect use information about you in accordance with our privacy policy. You can view a copy of this policy by clicking here https://carlist.sg'
            ]
        },
    ]

    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={(item)=>item.id.toString()}
                renderItem={({item,index})=>(
                    <View>
                        <Text
                            style={{
                                color:theme.black,
                                fontWeight:'bold',
                                fontSize:16
                            }}
                        >{+index+1} {item.title}</Text>
                        <TOSContentText data={item.content} parentIndex={index}/>
                    </View>
                )}
            />
        </View>
    )
}
