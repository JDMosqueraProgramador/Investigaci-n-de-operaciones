from . import functions as decisions
import numpy as np

d1 = np.array([120, 0])
d2 = np.array([90, 60])
d3 = np.array([150, -20])

alternatives = np.array([d1, d2, d3])
probabilities = np.array([0.78, 0.22])

dependsProbabilities = np.array([[0.60, 0.40], [0.20, 0.80]])

# from objects import ( alternatives, probabilities )

opt = decisions.optimist(alternatives)
cons = decisions.conservative(alternatives)
max_regret = decisions.max_regret(opt, cons)
evidences = decisions.evidences(alternatives, probabilities)

awaited_value = decisions.evidences(np.array([[opt.max(), cons.max()]]), probabilities)[0]

vea = awaited_value - evidences.max()

evidences_with_max_regret = decisions.evidences(max_regret, probabilities)
print(evidences_with_max_regret)

if round(evidences_with_max_regret.min(), 1) == round(vea, 1):
    print("Good VEA") 

probability_success = decisions.evidence(probabilities[0], probabilities[1], dependsProbabilities[0, 0], dependsProbabilities[1, 0])

probability_fail = decisions.evidence(probabilities[0], probabilities[1], dependsProbabilities[0, 1], dependsProbabilities[1, 1])

roots = np.array([probability_success, probability_fail])

results_with_probabilities = decisions.probabilities_of_ocurrence(dependsProbabilities, probabilities, roots)

print("results_with_probabilities", results_with_probabilities)

# TREE ------------------------------------------------------------------------------------------

tails = np.array([
        [results_with_probabilities[0], results_with_probabilities[2]], 
        [results_with_probabilities[1], results_with_probabilities[3]]
    ])

evidence_with_success_percent = decisions.evidences(alternatives, tails[0])
evidence_with_fail_percent = decisions.evidences(alternatives, tails[1])

print("evidence:", evidence_with_success_percent, evidence_with_fail_percent)

veod = decisions.evidence(roots[0], roots[1], evidence_with_success_percent.max(), evidence_with_fail_percent.max())

efficiency = abs(veod - awaited_value) / vea 

print(efficiency)