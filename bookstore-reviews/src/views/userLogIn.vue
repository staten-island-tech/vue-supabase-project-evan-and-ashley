<template>
    <div>
        <h1> User Login</h1>
    </div>
</template>

<script setup>
import {useState} from "react"
const Create = () => {
    const [name, setTitle] = useState ('')
    const [method, setMethod] = useState('')
    const [rating,setRating] = useState ('')
    const [formError, setFormError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!name || !method || !rating ){
            setFormError('Please fill in all the fields correctly')
            return
        }
    }

    return (
         
    )
}
</script>

<style lang="scss" scoped>

</style>