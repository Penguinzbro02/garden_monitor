import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export const Form = ({ onAddRecord }) => {
    const [file, setFile] = useState();
    const now = new Date();
    const today = now.toLocaleDateString('en-CA');

    function handleChange(e) {
        if (!e.target.files || e.target.files.length === 0) {
            setFile(null);
            return;
        }

        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    // set the data types of the form fields
    const schema = yup.object().shape({
        name: yup.string().required("Name is a required field"),
        plantStartDate: yup.date().required("Plant start date is a required field"),
        height: yup.string().notRequired(),
        // make date field optional
        water: yup
            .date()
            .nullable()
            .transform((curr, orig) => (orig === "" ? null : curr))
            .notRequired(),
        fertilizer: yup
            .date()
            .nullable()
            .transform((curr, orig) => (orig === "" ? null : curr))
            .notRequired(),
        photo: yup.string().notRequired(),
        notes: yup.string().notRequired(),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            plantStartDate: today,
            water: today,
            fertilizer: today,
        },
    });

    // Sends data to backend API endpoint 
    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await fetch('http://127.0.0.1:5000/api/save-log', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Log saved successfully!');
                if (onAddRecord) {
                    onAddRecord(data); // trigger update in Log.js
                }
            } else {
                console.error('Failed to save log.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" id="name" name="name" placeholder="Name" {...register("name")} />
            <label htmlFor="plant_start_date">Plant Start Date</label>
            <input type="date" id="plant_start_date" name="plant_start_date" {...register("plantStartDate")} />
            <input type="text" id="height_history" name="height_history" placeholder="Height" {...register("height")} />
            <label htmlFor="watering_history">Last Watered:</label>
            <input type="date" id="watering_history" name="watering_history" {...register("water")} />
            <label htmlFor="fertilizer_history">Last Fertilized:</label>
            <input type="date" id="fertilizer_history" name="fertilizer_history" {...register("fertilizer")} />
            <textarea id="notes" name="notes" placeholder="Notes" {...register("notes")}></textarea>
            <button type="submit">Submit</button>
            <p className="form-error">{errors.name?.message}</p>
            <p className="form-error">{errors.plantStartDate?.message}</p>
        </form>
    );
};