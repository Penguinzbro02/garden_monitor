import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

export const Form = () => {
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
    });

    // display the submitted form data to console
    const onSubmit = (data) => {
        console.log(data);
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" name="name" placeholder="Name" {...register("name")} />
            <input type="date" name="plant_start_date" {...register("plantStartDate")} />
            <input type="text" name="height_history" {...register("height")} />
            <input type="date" name="watering_history" {...register("water")} />
            <input type="date" name="fertilizer_history" {...register("fertilizer")} />
            <input type="text" name="photo" {...register("photo")} />
            <textarea name="notes"{...register("notes")} ></textarea>
            <button type="submit">Submit</button>
            <p className="form-error">{errors.name?.message}</p>
            <p className="form-error">{errors.plantStartDate?.message}</p>

        </form>
    );
};