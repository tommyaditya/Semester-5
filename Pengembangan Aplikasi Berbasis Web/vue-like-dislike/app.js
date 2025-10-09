const { createApp } = Vue;

createApp({
    data() {
        return {
            reaction: null,
            likeCount: 0,
            dislikeCount: 0,
        };
    },
    computed: {
        message() {
            if (this.reaction === 'like') return 'You liked this.';
            if (this.reaction === 'dislike') return 'You disliked this.';
            return 'No reaction yet.';
        },
    },
    methods: {
        setReaction(type) {
            if (type === 'like') {
                if (this.reaction !== 'like') {
                    this.likeCount++;
                    if (this.reaction === 'dislike') this.dislikeCount--;
                    this.reaction = 'like';
                } else {
            this.likeCount--;
            this.reaction = null;
        }
        } else if (type === 'dislike') {
            if (this.reaction !== 'dislike') {
                this.dislikeCount++;
                if (this.reaction === 'like') this.likeCount--;
                this.reaction = 'dislike';
            } else {
                this.dislikeCount--;
                this.reaction = null;
            }
        }
        },
    },
}).mount('#app');
