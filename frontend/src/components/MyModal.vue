<template>
    <div class="modal fade" tabindex="-1" data-bs-dismiss="modal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{ no ? no : "No" }}</button>
                    <button type="button" class="btn btn-primary">{{ yes ? yes : "Yes" }}</button>
                </div>
            </div>
        </div>
    </div>  
</template>

<script>
export default {
    props: {
        title: String,
        no: String,
        yes: String,
    }
}
</script>