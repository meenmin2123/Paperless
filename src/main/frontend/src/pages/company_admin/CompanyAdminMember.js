import React from 'react';
import { Table, Button, Form,  InputGroup, Row, Col} from 'react-bootstrap';
import styles from '../../styles/company/admin/company_member.module.css';
import Menubar from '../layout/menubar';

function CompanyAdminMember () {
    return (
        <div className="container-xl">
            <Menubar />

            <div>직원 관리</div>
            <div>
                <Form inline>
                    <Button variant="primary">Primary</Button>
                    <Button variant="primary">Primary</Button>
                </Form>
                <Form inline>
                    <Row>
                        <Col xs="auto">
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                className=" mr-sm-2"
                            />
                        </Col>
                        <Col xs="auto">
                            <Button type="submit">Submit</Button>
                        </Col>
                    </Row>
                </Form>
                
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td colSpan={2}>Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </Table>

        </div>
    );
}

export default CompanyAdminMember;