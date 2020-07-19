import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ErrorMessage from '../errorMessage';
import './app.css';
import CharPage from '../charPage';
import ItemList from '../itemList';
import CharDetails from '../charDetails';
import GotService from '../../services/service';
    
export default class App extends React.Component {

    gotService = new GotService();
    state = {
        showRandomChar: true,
        error: false,
    }

    componentDidCatch() {
        console.log('error')
        this.setState({
            error: true
        })
    }

    toggleRandomChar = () => {
        this.setState((state) => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        const char = this.state.showRandomChar ? <RandomChar/> : null;
        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <button 
                                className="toggle-btn"
                                onClick={this.toggleRandomChar}>Toggle random character</button>
                        </Col>
                    </Row> 
                    <CharPage/> 
                    <Row>
                        <Col md='6'>
                            <ItemList 
                            onCharSelected={this.onCharSelected}
                            getData={this.gotService.getAllBooks}
                            renderItem={ (item) => item.name}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList 
                            onCharSelected={this.onCharSelected}
                            getData={this.gotService.getAllHouses}
                            renderItem={ (item) => item.name}/>
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar}/>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
};
