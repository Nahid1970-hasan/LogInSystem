import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import styled from 'styled-components';
import { Container } from "../components/style/Container_styled";
import { Typography } from "../components/style/Typography_styled";
import { Flex } from "../components/style/Flex_styled";
import { InfoCard } from "../components/style/Card_styled";
import strlImage from '../assets/image/strl.png';

// Styled-components for styling
const Image = styled.img`
   width: 100%;
   height: 500px;
   text-align: center;
   vertical-align: middle;
   padding: 0 20px;
`;

export const Home = () => {
    return (
        <div>
            <Container>
                <InfoCard height="600px" margin="1px 0">
                    <Flex row>
                        <Flex md={12} padding="20px 0 0 90px !important">
                            <Typography fontSize="bodyTitleFontSize" fontWeight="bold" margin="0 0 20px 0">
                                Hello! Welcome to our live Streaming
                            </Typography>

                            {/* Wrap the image with a Link component */}
                            <Link to="/login">
                                <Image src={strlImage} alt="Girl in a jacket" />
                                {/* <iframe src="https://www.youtube.com/embed/Dwh4S4mbMuQ?autoplay=1" width="50%"
                                    height="400px" ></iframe> */}
                            </Link>



                        </Flex>
                    </Flex>
                </InfoCard>
            </Container>
        </div>
    );
};
