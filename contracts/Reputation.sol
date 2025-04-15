// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.28;

contract Reputation{
    struct Feedback {
        uint256 rating;
        string comment;
    }


    // stores an address of mapped to feebacks
    mapping(address => Feedback[]) public feedbacks;

    // events
    event FeedbackGiven(address indexed user, uint256 rating, string comment);


    // functions
    function giveFeedback(address _user, uint256 _rating, string memory _comment) external {
        require(_rating >= 1 && _rating <= 5, "Rating must be 1-5");
        feedbacks[_user].push(Feedback(_rating, _comment));

        emit FeedbackGiven(_user, _rating, _comment);
    }

    function getAverageRating(address _user) external view returns (uint256 avg){
        Feedback[] memory userFeedbacks = feedbacks[_user];
        if(userFeedbacks.length == 0) return 0;

        uint256 total;
        for(uint256 i = 0; i < userFeedbacks.length; i++){
            total += userFeedbacks[i].rating;
        }

        return total / userFeedbacks.length;
    }
}