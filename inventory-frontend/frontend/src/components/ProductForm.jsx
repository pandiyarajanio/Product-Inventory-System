import React, { useState } from 'react';
import axios from 'axios';
const ProductForm = () => {
    const [name, setName] = useState('');
    const [variants, setVariants] = useState([{ name: '', options: [''] }]);

    const handleVariantChange = (index, event) => {
        const newVariants = [...variants];
        newVariants[index].name = event.target.value;
        setVariants(newVariants);
    };

    const handleOptionChange = (variantIndex, optionIndex, event) => {
        const newVariants = [...variants];
        newVariants[variantIndex].options[optionIndex] = event.target.value;
        setVariants(newVariants);
    };

    const addVariant = () => {
        setVariants([...variants, { name: '', options: [''] }]);
    };

    const addOption = (variantIndex) => {
        const newVariants = [...variants];
        newVariants[variantIndex].options.push('');
        setVariants(newVariants);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const productData = {
            name,
            variants: variants.map(variant => ({
                name: variant.name,
                subvariants: variant.options.map(option => ({ name: option, stock: 0 }))
            }))
        };
        try {
            await axios.post('/api/api/products/', productData);
            alert('Product created successfully!');
            console.log(productData);
        } catch (error) {
            alert('Error creating product'  + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='formalign'>
            <label className='labalboxstyle'>
                Product Name:
                <input type="text" className='inputboxstyle' value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
            {variants.map((variant, variantIndex) => (
                <div key={variantIndex}>
                    <label className='labalboxstyle Addstyle'>
                        Variant Name:
                        <input
                            type="text"
                            className='inputboxstyle'
                            value={variant.name}
                            onChange={(e) => handleVariantChange(variantIndex, e)}
                            required
                        />
                    </label>
                    {variant.options.map((option, optionIndex) => (
                        <label key={optionIndex} className='labalboxstyle Addstyle'>
                            Option:
                            <input
                                type="text"
                                className='inputboxstyle substyle'
                                value={option}
                                onChange={(e) => handleOptionChange(variantIndex, optionIndex, e)}
                                required
                            />
                        </label>
                    ))}
                    <button type="button" className='btnOne' onClick={() => addOption(variantIndex)}>Add Option</button>
                </div>
            ))}
            <button type="button" className='btnOne btnColorOne' onClick={addVariant}>Add Variant</button>
            <button type="submit" className='btnOne btnColorTwo'>Create Product</button>
        </form>
    );
};

export default ProductForm;