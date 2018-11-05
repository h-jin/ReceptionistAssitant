import React from 'react';
import { Select } from 'antd';

const Option = Select.Option;

const options = ["emergency", "appointment", "walk-in"];
const SectionSelector = ({ defaultValue, handleSectionChange }) => (

    <Select defaultValue={defaultValue || "Appointment"} style={{ width: 120 }} onChange={handleSectionChange}>

        {
            options.map(option => (
                <Option key={option} value={option}>{option}</Option>
            ))
        }
    </Select>
)

export default SectionSelector;