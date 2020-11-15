import React, {Component} from 'react'
import Product from './Product'

class ProductList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataLoaded: false,
            data: null
        }
        this.fetchData = this.fetchData.bind(this)
    }

    fetchData() {
        fetch("https://onedrop.today/products.json")
            .then(res => res.json())
            .then(p => {
                console.log('yupyup')
                this.setState({
                    dataLoaded: true,
                    data: p.products
                })
            })
            .catch(err => {
                console.log('Error in fetching data:', err)
            })
    }

    componentDidMount() {
        this.fetchData()
        this.interval = setInterval(this.fetchData, 60000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    renderProducts() {
        return this.state.data
            .filter(el => el.variants[0].price !== '0.00')
            .sort((a, b) => b.variants[0].price - a.variants[0].price)
            .map((el,i) => {
                return <Product key={i} product={el} />
            })
    }
    
    render() {
        return (
            <div className='product-list'>
                {this.state.dataLoaded ? this.renderProducts() : ''}
            </div>
        )
    }

}

export default ProductList