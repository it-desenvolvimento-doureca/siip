package pt.example.entity;

import java.sql.Time;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "RP_OF_OP_CAB")
public class RP_OF_OP_CAB {

	private Integer ID_OP_CAB;
	private Integer ID_OF_CAB;
	private Time TEMPO_PREP_TOTAL;
	private Time TEMPO_PARA_TOTAL;
	private Time TEMPO_EXEC_TOTAL;

	@Id
	@Column(name = "ID_OP_CAB")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Integer getID_OP_CAB() {
		return ID_OP_CAB;
	}

	@Column(name = "ID_OF_CAB")
	public Integer getID_OF_CAB() {
		return ID_OF_CAB;
	}

	@Column(name = "TEMPO_PREP_TOTAL")
	public Time getTEMPO_PREP_TOTAL() {
		return TEMPO_PREP_TOTAL;
	}

	@Column(name = "TEMPO_PARA_TOTAL")
	public Time getTEMPO_PARA_TOTAL() {
		return TEMPO_PARA_TOTAL;
	}

	@Column(name = "TEMPO_EXEC_TOTAL")
	public Time getTEMPO_EXEC_TOTAL() {
		return TEMPO_EXEC_TOTAL;
	}

	public void setID_OP_CAB(Integer iD_OP_CAB) {
		ID_OP_CAB = iD_OP_CAB;
	}

	public void setID_OF_CAB(Integer iD_OF_CAB) {
		ID_OF_CAB = iD_OF_CAB;
	}

	public void setTEMPO_PREP_TOTAL(Time tEMPO_PREP_TOTAL) {
		TEMPO_PREP_TOTAL = tEMPO_PREP_TOTAL;
	}

	public void setTEMPO_PARA_TOTAL(Time tEMPO_PARA_TOTAL) {
		TEMPO_PARA_TOTAL = tEMPO_PARA_TOTAL;
	}

	public void setTEMPO_EXEC_TOTAL(Time tEMPO_EXEC_TOTAL) {
		TEMPO_EXEC_TOTAL = tEMPO_EXEC_TOTAL;
	}

}
