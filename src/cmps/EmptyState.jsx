import React from 'react'

export function EmptyState({ isFiltered }) {

    return (
        <div className="empty-state-container">
            <h2>Looks like there are no tasks!</h2>
            {(isFiltered) ? (
                <div>
                    <p>Try changing your filters, or add some new tasks!</p>
                </div>
            ) : (
                    <div>
                        <p>We can't seem to find any tasks... </p>
                    </div>
                )}
                <p>why not create some new ones?</p>
        </div>
    )
}
