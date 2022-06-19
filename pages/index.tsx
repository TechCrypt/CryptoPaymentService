import type {NextPage} from 'next'
import Head from 'next/head'
import {SectionHomePage} from '../components/Landing/Sections/SectionHomePage/SectionHomePage'
import {BlurLayout} from '../layouts/BlurLayout'
import {SectionOpportunity} from '../components/Landing/Sections/SectionOpportunity/SectionOpportunity'
import {Box} from '@mui/material'
import {SectionSolution} from '../components/Landing/Sections/SectionSolution/SectionSolution'
import {SectionRoadmap} from '../components/Landing/Sections/SectionRoadmap/SectionRoadmap'
import {LandingProvider} from '../providers/LandingProvider'
import {Footer} from '../components/Landing/Footer/Footer'
import {SectionHowItWorks} from '../components/Landing/Sections/SectionHowItWorks/SectionHowItWorks'


const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>Comm</title>
            </Head>
            <BlurLayout>
                <LandingProvider>
                    <Box width={'100%'} height={'100%'} overflow={'hidden'}>
                        <SectionHomePage/>
                        <SectionOpportunity/>
                        <SectionSolution/>
                        <SectionHowItWorks/>
                        <SectionRoadmap/>
                        <Footer/>
                    </Box>
                </LandingProvider>
            </BlurLayout>
        </>
    )
}
export default Home
