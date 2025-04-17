export const Form = () => {
    return (
        <form>
            <input type="text" name="name" placeholder="Name" />
            <input type="date" name="plant_start_date" />
            <input type="date" name="plant_start_date" />
            <input type="text" name="height_history" />
            <input type="date" name="watering_history" />
            <input type="date" name="fertilizer_history" />
            <input type="text" name="photo" />
            <textarea name="notes" ></textarea>
            <button type="submit">Submit</button>

        </form>
    )
}