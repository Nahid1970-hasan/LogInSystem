import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from "../components/style/Container_styled";
import { Flex } from "../components/style/Flex_styled";
import { FormStyled } from "../components/style/From_style";
import { Input } from "../components/style/Input_styled";
import { Loader } from "../components/style/Loader_styled";
import { useDispatch, useSelector } from "react-redux";
import { getLogin } from "../features/user/user_slice";
import { Label } from "../components/style/Label";
import { Typography } from "../components/style/Typography_styled";
import { useOutsideClicker } from "../utils/helper";
import { theme } from "../styles/theme";
import { PrimaryButton } from "../components/Button";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import { InfoCard } from "../components/style/Card_styled";
import { useSpring, animated } from '@react-spring/web';
import styled from 'styled-components';

const Body = styled.div`
  height: 60vh;
`;

export const Login = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const wraperRef = useRef(null);
  const [open, setOpen] = useState(false);
  useOutsideClicker(wraperRef, () => { setOpen(false) });
  const navigate = useNavigate();

  const [fingerprint, setFingerprint] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    const getFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
      setFingerprint(result.visitorId);
    };

    getFingerprint();
  }, []);

  const handleClick = async (event) => {
    event.preventDefault();
    navigate('/dashboard');
  };

  const handleClickFinger = async (event) => {
    event.preventDefault();
    if (dirty && isValid && fingerprint) {
      console.log('Fingerprint:', fingerprint);
      // Example: send fingerprint to server or proceed with fingerprint-based authentication
    }
  };

  // Define the animation
  const props = useSpring({
    to: { backgroundPosition: '100% 100%' },
    from: { backgroundPosition: '0% 0%' },
    reset: true,
    config: { duration: 5000 },
    loop: true,
  });

  return (
    <>
      <Suspense fallback={<Loader />}>
        <Container style={{ position: 'relative', overflow: 'hidden' }}>
          <animated.div
            style={{
              ...props,
              height: '100vh',
              backgroundSize: '400% 400%',
              backgroundImage: 'linear-gradient(45deg, #ff6b6b, #f7d06e)',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: -1,
            }}
          />
          <Flex row>
            <Flex md={4}></Flex>
            <Flex padding="10px 0 10px 0 !important" md={4} sm={12}>
              <InfoCard margin="0 0 30px 0">
                <FormStyled>
                  <>
                    <Typography textAlign="center" fontSize="bodyTitleFontSize" margin="20px 0 0 0" fontWeight="bold">
                      Login
                    </Typography>
                    <div>
                      <Flex row>
                        <Flex padding="10px 0 0 0 !important" md="12">
                          <form>
                            <Label color="font" htmlFor="username">User name</Label>
                            <Input
                              type="text"
                              placeholder="user_name"
                              name="username"
                            />
                            <Label color="font" htmlFor="password">Password</Label>
                            <Input
                              type="password"
                              name="password"
                              placeholder="password"
                            />
                            <Flex row>
                              <Flex md={12} padding={"0 !important"}>
                                <section>
                                  <div>
                                    <Input type="checkbox" value="login" id="rememverMe" name="login" />
                                    <Label margin="10px 0 10px 0" color="font" htmlFor="rememverMe">remember me</Label>
                                  </div>
                                  <div>
                                    <Typography fontSize="bodyContentFontSize" textAlign="left">
                                      <Link to="/reset">forget password</Link>
                                    </Typography>
                                  </div>
                                </section>
                              </Flex>
                              <Flex row>
                                <Flex md={2} padding="0 !important">
                                  <PrimaryButton
                                    type="submit"
                                    onClick={handleClick}
                                  >
                                    Login
                                  </PrimaryButton>
                                </Flex>
                                <Flex md={2} padding="0 !important">
                                  <PrimaryButton
                                    type="button"
                                    onClick={handleClickFinger}
                                    disabled={!(dirty && isValid)}
                                  >
                                    Fingerprint
                                  </PrimaryButton>
                                </Flex>
                                <Flex md={8} padding="0 0 15px 0 !important">
                                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <div ref={wraperRef}>
                                      <Typography fontSize="bodyContentFontSize" textAlign="end">
                                        Click here to <Link to="/reg">signup</Link>
                                      </Typography>
                                    </div>
                                  </div>
                                </Flex>
                              </Flex>
                            </Flex>
                          </form>
                        </Flex>
                      </Flex>
                    </div>
                  </>
                </FormStyled>
              </InfoCard>
            </Flex>
            <Flex md={4}></Flex>
          </Flex>
        </Container>
      </Suspense>
    </>
  );
};
