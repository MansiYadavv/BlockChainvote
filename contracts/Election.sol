// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Election {
    // Structure for a candidate
    struct Candidate {
        uint id;
        string name;
        string party;
        string manifesto;
        uint voteCount;
    }

    // Structure for an election
    struct ElectionData {
        string name;
        string description;
        uint startTime;
        uint endTime;
        bool isActive;
    }

    // Election information
    ElectionData public electionInfo;

    // Store candidates (starts from index 1)
    mapping(uint => Candidate) public candidates;

    // Store if a voter has voted
    mapping(address => bool) public hasVoted;

    // Number of candidates
    uint public candidatesCount;

    // Admin address
    address public admin;

    // Events
    event VoteCast(address indexed voter, uint indexed candidateId);
    event CandidateAdded(uint indexed candidateId, string name, string party);
    event ElectionStarted(uint startTime, uint endTime);
    event ElectionEnded();

    // Modifiers
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier electionActive() {
        require(electionInfo.isActive, "Election is not active");
        require(block.timestamp >= electionInfo.startTime, "Election has not started yet");
        require(block.timestamp <= electionInfo.endTime, "Election has ended");
        _;
    }

    // Constructor
    constructor(string memory _name, string memory _description) {
        admin = msg.sender;
        electionInfo.name = _name;
        electionInfo.description = _description;
        electionInfo.isActive = false;
    }

    // Start election
    function startElection(uint _durationInMinutes) external onlyAdmin {
        require(!electionInfo.isActive, "Election already active");

        electionInfo.startTime = block.timestamp;
        electionInfo.endTime = block.timestamp + (_durationInMinutes * 1 minutes);
        electionInfo.isActive = true;

        emit ElectionStarted(electionInfo.startTime, electionInfo.endTime);
    }

    // End election
    function endElection() external onlyAdmin electionActive {
        electionInfo.isActive = false;
        emit ElectionEnded();
    }

    // Add a candidate
    function addCandidate(
        string memory _name,
        string memory _party,
        string memory _manifesto
    ) external onlyAdmin {
        require(!electionInfo.isActive, "Cannot add candidates during an active election");

        candidatesCount++;
        candidates[candidatesCount] = Candidate({
            id: candidatesCount,
            name: _name,
            party: _party,
            manifesto: _manifesto,
            voteCount: 0
        });

        emit CandidateAdded(candidatesCount, _name, _party);
    }

    // Cast a vote
    function vote(uint _candidateId) external electionActive {
        require(!hasVoted[msg.sender], "You have already voted");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");

        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;

        emit VoteCast(msg.sender, _candidateId);
    }

    // Get total votes
    function getTotalVotes() external view returns (uint totalVotes) {
        for (uint i = 1; i <= candidatesCount; i++) {
            totalVotes += candidates[i].voteCount;
        }
    }

    // Check if a user has voted
    function checkIfVoted(address _voter) external view returns (bool) {
        return hasVoted[_voter];
    }

    // Get election status and time remaining
    function getElectionStatus()
        external
        view
        returns (bool isActive, bool hasStarted, bool hasEnded, uint timeRemaining)
    {
        isActive = electionInfo.isActive;
        hasStarted = block.timestamp >= electionInfo.startTime;
        hasEnded = block.timestamp > electionInfo.endTime;

        if (hasStarted && !hasEnded) {
            timeRemaining = electionInfo.endTime - block.timestamp;
        } else {
            timeRemaining = 0;
        }
    }

    // ✅ Return all candidates as an array
    function getAllCandidates() external view returns (Candidate[] memory) {
        Candidate[] memory result = new Candidate[](candidatesCount);
        for (uint i = 0; i < candidatesCount; i++) {
            result[i] = candidates[i + 1];
        }
        return result;
    }

    // ✅ Get total number of candidates
    function getCandidateCount() external view returns (uint) {
        return candidatesCount;
    }
}
