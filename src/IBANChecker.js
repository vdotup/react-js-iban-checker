import React, { useState, useEffect } from 'react';
import { Container, Form, Alert, Image, Card, Row, Col } from 'react-bootstrap';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';
import './IBANChecker.css';

const banks = [
    {
        'samaCode': '55',
        'bankName': 'Banque Saudi Fransi',
        'nameEn': 'Banque Saudi Fransi',
        'nameAr': 'البنك السعودي الفرنسي',
    },
    {
        'name': 'Alrajhi Bank',
        'samaCode': '80',
        'nameEn': 'Alrajhi Bank',
        'nameAr': 'بنك الراجحي',
    },
    {
        'samaCode': '10',
        'bankName': 'National Commercial Bank',
        'nameEn': 'National Commertial Bank',
        'nameAr': 'البنك الأهلي التجاري',
    },
    {
        'samaCode': '45',
        'bankName': 'Saudi British Bank',
        'nameEn': 'SABB',
        'nameAr': 'ساب',
    },
    {

        'samaCode': '20',
        'bankName': 'Riyadh Bank',
        'nameEn': 'Riyad Bank',
        'nameAr': 'بنك الرياض',
    },
    {

        'samaCode': '40',
        'bankName': 'Saudi American Bank',
        'nameEn': 'SAMBA',
        'nameAr': 'سامبا',
    },
    {
        'samaCode': '05',
        'bankName': 'Alinma Bank',
        'nameEn': 'AL Inma Bank',
        'nameAr': 'بنك الانماء',
    },
    {
        'samaCode': '50',
        'bankName': 'Alawwal bank',
        'nameEn': 'AlAwwal Bank',
        'nameAr': 'البنك الأول',
    },
    {
        'samaCode': '60',
        'bankName': 'Bank AlJazira',
        'nameEn': 'Bank Aljazerah',
        'nameAr': 'بنك الجزيرة',
    },
    {
        'samaCode': '65',
        'bankName': 'Saudi Investment Bank',
        'nameEn': 'Saudi Investment Bank',
        'nameAr': 'البنك السعودي للأستثمار',
    },
    {
        'samaCode': '15',
        'bankName': 'Bank AlBilad',
        'nameEn': 'BANK ALBELAD',
        'nameAr': 'بنك البلاد',
    },
    {
        'samaCode': '30',
        'bankName': 'Arab National Bank',
        'nameEn': 'Arab National Bank',
        'nameAr': 'البنك العربي الوطني',
    },
    {
        'samaCode': '90',
        'bankName': 'GULF Bank',
        'sarieCode': 'GULFSARI',
        'nameEn': 'Gulf International Bank',
        'nameAr': 'بنك الخليج',
    },
    {
        'samaCode': '95',
        'bankName': 'Emirates Bank',
        'nameEn': 'EMARITE BANK',
        'nameAr': 'بنك الامارات',
    },
    {
        'samaCode': '76',
        'bankName': 'Bank Muscat',
        'nameEn': 'Bank Muscat',
        'nameAr': 'بنك مسقط',
    },
    {
        'samaCode': '71',
        'bankName': 'National Bank of Bahrain',
        'nameEn': 'National Bank Of Bahrain',
        'nameAr': 'بنك البحرين الوطني',
    },
    {
        'samaCode': '75',
        'bankName': 'National Bank of Kuwait',
        'nameEn': 'National Bank of Kuwait',
        'nameAr': 'بنك الكويت الوطني',
    },
    {
        'samaCode': '85',
        'bankName': 'BNP Paribas Bank',
        'nameEn': 'BNP PARIBAS SAUDI ARABIA',
        'nameAr': 'بي ان بي باريبوس',
    },
];

const IBANChecker = () => {
    const [iban, setIban] = useState('');
    const [isValid, setIsValid] = useState(null);
    const [error, setError] = useState('');
    const [bank, setBank] = useState(null);
    const [accountNumber, setAccountNumber] = useState('');

    useEffect(() => {
        const validateIBAN = (iban) => {
            const trimmedIban = iban.replace(/\s+/g, '');

            if (!trimmedIban.startsWith('SA')) {
                return { valid: false, error: 'IBAN must start with "SA"' };
            }

            if (trimmedIban.length !== 24) {
                return { valid: false, error: 'IBAN must be exactly 24 characters long' };
            }

            const samaCode = trimmedIban.substring(4, 6);
            const bank = banks.find(bank => bank.samaCode === samaCode);
            if (!bank) {
                return { valid: false, error: `Bank code ${samaCode} is not valid` };
            }

            setBank(bank);
            setAccountNumber(trimmedIban.substring(12));
            return { valid: true, error: '' };
        };

        const { valid, error } = validateIBAN(iban);
        setIsValid(valid);
        setError(error);

        if (!valid) {
            setBank(null);
            setAccountNumber('');
        }
    }, [iban]);

    const formatIBAN = (value) => {
        const arabicIndicDigits = /[\u0660-\u0669]/g;
        const convertedValue = value.replace(arabicIndicDigits, (digit) =>
            String.fromCharCode(digit.charCodeAt(0) - 0x0660 + 0x0030)
        );
        const cleanedValue = convertedValue.replace(/\s+/g, '');
        const uppercasedValue = cleanedValue.toUpperCase();
        const regex = /.{1,4}/g;
        return uppercasedValue.match(regex)?.join(' ') || '';
    };

    const handleChange = (e) => {
        let value = e.target.value;
        value = value.replace(/\s+/g, '').slice(0, 24);
        const formattedIBAN = formatIBAN(value);
        setIban(formattedIBAN);
    };

    return (
        <Container className="mt-5 d-flex justify-content-center">
            <Card className="p-4 shadow-sm iban-card">
                <h2 className="mb-4 text-center">IBAN Checker</h2>
                <Form className="mb-4">
                    <Form.Group controlId="formIban">
                        <Form.Label className="text-left">IBAN</Form.Label>
                        <div className="d-flex align-items-center">
                            <Form.Control
                                type="text"
                                placeholder="Enter IBAN"
                                value={iban}
                                onChange={handleChange}
                                className="shadow-sm"
                            />
                            {isValid !== null && (
                                <div className="ml-3">
                                    {isValid ? (
                                        <CheckCircleFill color="green" size={30} />
                                    ) : (
                                        <XCircleFill color="red" size={30} />
                                    )}
                                </div>
                            )}
                        </div>
                        {isValid === false && <Alert variant="danger" className="mt-2">{error}</Alert>}
                    </Form.Group>
                </Form>
                <Row className="mb-3">
                    <Col>
                        <Form.Group>
                            <Form.Label className="text-left">Bank Account</Form.Label>
                            <div className="d-flex align-items-center">
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    value={accountNumber}
                                    readOnly
                                    className="shadow-sm"
                                />
                                {isValid && (
                                    <div className="ml-3">
                                        <CheckCircleFill color="green" size={30} />
                                    </div>
                                )}
                            </div>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label className="text-left">Bank Name</Form.Label>
                            <div className="d-flex align-items-center">
                                <Form.Control
                                    type="text"
                                    placeholder=""
                                    value={bank ? bank.nameEn : ''}
                                    readOnly
                                    className="shadow-sm"
                                />
                                {isValid && (
                                    <div className="ml-3">
                                        <CheckCircleFill color="green" size={30} />
                                    </div>
                                )}
                            </div>
                            {bank && (
                                <div className="text-center mt-3">
                                    <Image src={`/bank-icons/${bank.samaCode}.png`} alt={bank.nameEn} width="100" />
                                </div>
                            )}
                        </Form.Group>
                    </Col>
                </Row>
            </Card>
        </Container>
    );
};

export default IBANChecker;